import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // remove SQL logs (optional)
    }
);

// Connect Database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database connected using Sequelize");
    } catch (error) {
        console.error("❌ Unable to connect to DB:", error);
    }
};

export { sequelize, connectDB };
