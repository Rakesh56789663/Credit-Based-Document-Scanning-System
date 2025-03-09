const db = require("../db");

// Create Scans Table
db.run(`
    CREATE TABLE IF NOT EXISTS scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        filename TEXT,
        content TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

// Save Document in Database
const saveDocument = (userId, filename, content, callback) => {
    db.run(
        "INSERT INTO scans (user_id, filename, content) VALUES (?, ?, ?)",
        [userId, filename, content],
        callback
    );
};

// Fetch All Documents
const getAllDocuments = (callback) => {
    db.all("SELECT * FROM scans", [], callback);
};

// Fetch User's Documents
const getUserDocuments = (userId, callback) => {
    db.all("SELECT * FROM scans WHERE user_id = ?", [userId], callback);
};

module.exports = { saveDocument, getAllDocuments, getUserDocuments };
