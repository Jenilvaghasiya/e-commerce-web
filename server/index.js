import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Check DB Route
app.get("/check-db", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ message: "DB Connected Successfully" });
    } catch (error) {
        res.status(500).json({ message: "DB Error", error });
    }
});

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await connectDB(); // Connect Sequelize
});
