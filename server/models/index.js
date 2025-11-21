 import { sequelize } from "../config/db.js";
 import Category from "./category.js";
 import Product from "./product.js";
 import User from "./user.js";

 const db = {};
 db.sequelize = sequelize;
 db.Category = Category;
 db.Product = Product;
 db.User = User;

 // Associations
 Category.hasMany(Product, { foreignKey: { name: "CategoryId", allowNull: false }, onDelete: "CASCADE" });
 Product.belongsTo(Category, { foreignKey: { name: "CategoryId", allowNull: false } });

 export const syncModels = async () => {
   await sequelize.sync({ alter: true });
 };

 export default db;
