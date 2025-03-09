const db = require("../db");

// Fetch scan count per user per day
const getScansPerUserPerDay = (callback) => {
    db.all(
        `SELECT user_id, COUNT(*) AS scan_count, DATE(uploaded_at) AS scan_date 
         FROM scans 
         GROUP BY user_id, scan_date`,
        [],
        callback
    );
};

// Fetch most common words in scanned documents (Basic NLP)
const getCommonTopics = (callback) => {
    db.all(`SELECT content FROM scans`, [], (err, documents) => {
        if (err) return callback(err, null);

        const wordCounts = {};
        documents.forEach(({ content }) => {
            const words = content
                .toLowerCase()
                .replace(/[^a-zA-Z\s]/g, "")
                .split(/\s+/);

            words.forEach((word) => {
                if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
            });
        });

        const sortedTopics = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Get top 10 common words

        callback(null, sortedTopics);
    });
};

// Fetch top users by scan count
const getTopUsers = (callback) => {
    db.all(
        `SELECT users.id, users.username, COUNT(scans.id) AS scan_count 
         FROM users 
         LEFT JOIN scans ON users.id = scans.user_id 
         GROUP BY users.id 
         ORDER BY scan_count DESC 
         LIMIT 5`,
        [],
        callback
    );
};

// Fetch credit usage statistics
const getCreditUsageStats = (callback) => {
    db.all(
        `SELECT users.username, users.credits, 
         (20 - users.credits) AS used_credits 
         FROM users 
         ORDER BY used_credits DESC 
         LIMIT 5`,
        [],
        callback
    );
};

module.exports = { getScansPerUserPerDay, getCommonTopics, getTopUsers, getCreditUsageStats };
