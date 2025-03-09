const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const creditRoutes = require("./routes/creditRoutes");
const adminRoutes = require("./routes/adminRoutes");
const scanRoutes = require("./routes/scanRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/auth", authRoutes);
app.use("/credits", creditRoutes);
app.use("/admin", adminRoutes);
app.use("/scan", scanRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/", (req, res) => {
    res.send("Document Scanner API is running!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
