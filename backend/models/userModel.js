const db = require("../db");
const bcrypt = require("bcryptjs");

// Create Users Table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user',
        credits INTEGER DEFAULT 20
    )
`);

// Create Credit Requests Table
db.run(`
    CREATE TABLE IF NOT EXISTS credit_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        status TEXT DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

// Register User Function
const registerUser = async (username, password, role = "user") => {
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO users (username, password, role, credits) VALUES (?, ?, ?, ?)",
      [username, hash, role, 20]
    );
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Authenticate User Function
const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, user) => {
        if (err || !user) return resolve(null);

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          resolve(user);
        } else {
          resolve(null);
        }
      }
    );
  });
};

// Deduct 1 Credit Per Scan
const deductCredit = async (userId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT credits FROM users WHERE id = ?", [userId], (err, user) => {
      if (err || !user)
        return resolve({ success: false, message: "User not found" });

      if (user.credits > 0) {
        db.run(
          "UPDATE users SET credits = credits - 1 WHERE id = ?",
          [userId],
          (err) => {
            if (err)
              return resolve({
                success: false,
                message: "Error deducting credit",
              });
            resolve({ success: true, message: "Credit deducted successfully" });
          }
        );
      } else {
        resolve({ success: false, message: "Not enough credits" });
      }
    });
  });
};

// Request Additional Credits
const requestCredits = async (userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO credit_requests (user_id, status) VALUES (?, 'pending')",
      [userId],
      (err) => {
        if (err)
          return resolve({
            success: false,
            message: "Error requesting credits",
          });
        resolve({ success: true, message: "Credit request sent" });
      }
    );
  });
};

// Approve Additional Credits (Admin Only)
const approveCredits = async (requestId, adminId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT role FROM users WHERE id = ?", [adminId], (err, admin) => {
      if (err || !admin || admin.role !== "admin") {
        return resolve({
          success: false,
          message: "Access denied. Admins only",
        });
      }

      db.get(
        "SELECT user_id FROM credit_requests WHERE id = ?",
        [requestId],
        (err, request) => {
          if (err || !request)
            return resolve({ success: false, message: "Request not found" });

          db.run(
            "UPDATE users SET credits = credits + 10 WHERE id = ?",
            [request.user_id],
            (err) => {
              if (err)
                return resolve({
                  success: false,
                  message: "Error adding credits",
                });

              db.run(
                "UPDATE credit_requests SET status = 'approved' WHERE id = ?",
                [requestId],
                (err) => {
                  if (err)
                    return resolve({
                      success: false,
                      message: "Error updating request status",
                    });
                  resolve({
                    success: true,
                    message: "Credits approved successfully",
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  deductCredit,
  requestCredits,
  approveCredits,
};
