const express = require("express");
const {  requestCredits } = require("../models/userModel");

const router = express.Router();



// Request additional credits
router.post("/request/:userId", (req, res) => {
    const { userId } = req.params;
    requestCredits(userId, (err, message) => {
        if (err) return res.status(400).json({ error: err });
        res.json({ message });
    });
});

module.exports = router;
