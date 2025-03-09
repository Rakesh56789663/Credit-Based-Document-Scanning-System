const express = require("express");
const { 
    getScansPerUserPerDay, 
    getCommonTopics, 
    getTopUsers, 
    getCreditUsageStats 
} = require("../models/analyticsModel");

const router = express.Router();

// Get scans per user per day
router.get("/scans-per-user", (req, res) => {
    getScansPerUserPerDay((err, data) => {
        if (err) return res.status(500).json({ error: "Error fetching scan data" });
        res.json({ scansPerUser: data });
    });
});

// Get most common topics
router.get("/common-topics", (req, res) => {
    getCommonTopics((err, data) => {
        if (err) return res.status(500).json({ error: "Error analyzing topics" });
        res.json({ commonTopics: data });
    });
});

// Get top users by scan count
router.get("/top-users", (req, res) => {
    getTopUsers((err, data) => {
        if (err) return res.status(500).json({ error: "Error fetching top users" });
        res.json({ topUsers: data });
    });
});

// Get credit usage statistics
router.get("/credit-usage", (req, res) => {
    getCreditUsageStats((err, data) => {
        if (err) return res.status(500).json({ error: "Error fetching credit stats" });
        res.json({ creditUsage: data });
    });
});

module.exports = router;
