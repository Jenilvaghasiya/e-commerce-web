import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false, validate: { len: [3, 100] } },
    description: { type: DataTypes.TEXT, allowNull: true },
    hsnCode: { type: DataTypes.STRING(10), allowNull: true },
    uom: { type: DataTypes.STRING(20), allowNull: true },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: "products", timestamps: true, underscored: true }
);

export default Product;
