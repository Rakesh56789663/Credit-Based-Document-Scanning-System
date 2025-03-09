const jwt = require("jsonwebtoken");
const secretKey = "supersecretkey";
const db = require("../db"); // Ensure database access

// Middleware to authenticate user
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract Bearer token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.sendStatus(403);

    // Fetch user details from database
    db.get(
      "SELECT id, username, role, credits FROM users WHERE id = ?",
      [decoded.id],
      (err, user) => {
        if (err || !user) return res.sendStatus(403);
        req.user = user; // Attach full user details
        next();
      }
    );
  });
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
}

module.exports = { authenticateToken, isAdmin };
