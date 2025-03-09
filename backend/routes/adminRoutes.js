const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all credit requests
router.get("/requests", (req, res) => {
    db.all("SELECT * FROM credit_requests WHERE status = 'pending'", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching requests" });
        }
        res.json(rows);
    });
});

// Approve a credit request
router.post("/approve", (req, res) => {
    const { requestId } = req.body;

    db.get("SELECT user_id FROM credit_requests WHERE id = ?", [requestId], (err, request) => {
        if (err || !request) {
            return res.status(400).json({ error: "Request not found" });
        }

        // Add credits to the user
        db.run("UPDATE users SET credits = credits + 10 WHERE id = ?", [request.user_id], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error adding credits" });
            }

            // Update the request status to approved
            db.run("UPDATE credit_requests SET status = 'approved' WHERE id = ?", [requestId], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error updating request status" });
                }
                res.json({ message: "Credits approved successfully" });
            });
        });
    });
});

// Reject a credit request
router.post("/reject", (req, res) => {
    const { requestId } = req.body;

    db.run("UPDATE credit_requests SET status = 'rejected' WHERE id = ?", [requestId], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error rejecting request" });
        }
        res.json({ message: "Request rejected successfully" });
    });
});

module.exports = router;
