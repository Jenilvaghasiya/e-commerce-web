import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { syncModels } from "./models/index.js";
import categoryRoutes from "./routes/categoryroutes.js";
import productRoutes from "./routes/productroutes.js";
import authRoutes from "./routes/authroutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Server is running..."));
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await connectDB();
    await syncModels();
});
