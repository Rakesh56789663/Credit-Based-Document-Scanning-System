const express = require("express");
const { registerUser, loginUser } = require("../models/userModel");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
// Register User
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  registerUser(username, password, role || "user", (err) => {
    if (err) return res.status(400).json({ error: "User already exists" });
    res.json({ message: "User registered successfully" });
  });
});
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
    credits: req.user.credits,
  });
});

// Login User
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          "supersecretkey",
          { expiresIn: "1h" }
        );
        res.json({ token, role: user.role, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  });
});

module.exports = router;
