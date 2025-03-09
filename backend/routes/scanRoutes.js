const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { saveDocument, getAllDocuments } = require("../models/scanModel");
const { deductCredit } = require("../models/userModel");

const router = express.Router();
const uploadFolder = "./uploads/";

// Setup Multer for file upload
const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Upload & Scan Document with Matching
router.post("/upload/:userId", upload.single("file"), (req, res) => {
    const { userId } = req.params;
    const filePath = req.file.path;

    // Read uploaded file content
    fs.readFile(filePath, "utf8", (err, content) => {
        if (err) return res.status(500).json({ error: "Error reading uploaded file" });

        // Get all stored documents from DB
        getAllDocuments((err, dbDocuments) => {
            if (err) return res.status(500).json({ error: "Error fetching documents from database" });

            // Read all files from the uploads folder
            fs.readdir(uploadFolder, (err, files) => {
                if (err) return res.status(500).json({ error: "Error reading uploaded folder" });

                let uploadedDocuments = [];

                // Read content of each file in uploads folder
                let readFiles = files.map((file) => {
                    return new Promise((resolve, reject) => {
                        fs.readFile(path.join(uploadFolder, file), "utf8", (err, fileContent) => {
                            if (!err) {
                                uploadedDocuments.push({ filename: file, content: fileContent });
                            }
                            resolve();
                        });
                    });
                });

                // Process all file reads before comparison
                Promise.all(readFiles).then(() => {
                    const allDocuments = [...dbDocuments, ...uploadedDocuments];

                    if (allDocuments.length === 0) {
                        return res.status(200).json({ message: "No documents available for comparison", bestMatch: null });
                    }

                    let bestMatch = { id: null, filename: "", similarity: -1 };

                    allDocuments.forEach((doc) => {
                        let similarity = levenshteinDistance(content, doc.content);
                        console.log(`Comparing with: ${doc.filename}, Similarity: ${similarity}`);

                        if (similarity > bestMatch.similarity) {
                            bestMatch = { id: doc.id || null, filename: doc.filename, similarity };
                        }
                    });


                    // Deduct credit and save document
                    deductCredit(userId, (err) => {
                        if (err) return res.status(400).json({ error: err });

                        saveDocument(userId, req.file.filename, content, (err) => {
                            if (err) return res.status(500).json({ error: "Error saving document" });

                            res.json({
                                message: "File uploaded and scanned successfully",
                                bestMatch,
                            });
                        });
                    });
                });
            });
        });
    });
});

// **Levenshtein Distance Algorithm**
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
        }
    }

    // Convert to percentage
    return ((1 - dp[len1][len2] / Math.max(len1, len2)) * 100).toFixed(2) + "%";
}


module.exports = router;
