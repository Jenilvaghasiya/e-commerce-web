import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING(120), allowNull: false },
    number: { type: DataTypes.STRING(20), allowNull: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(80), allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    country: { type: DataTypes.STRING(80), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  { tableName: "users", timestamps: true, underscored: true }
);

export default User;
