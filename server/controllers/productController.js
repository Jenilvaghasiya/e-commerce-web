import Product from "../models/product.js";
import Category from "../models/category.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, hsnCode, uom, price = 0, isActive = true, categoryId } = req.body;
    if (!name || name.length < 3) return res.status(400).json({ message: "name is required (min 3)" });
    if (!categoryId) return res.status(400).json({ message: "categoryId is required" });
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });
    const product = await Product.create({ name, description, hsnCode, uom, price, isActive, CategoryId: categoryId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

export const listProducts = async (_req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Category, attributes: ["id", "name"] }], order: [["created_at", "DESC"]] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, { include: [{ model: Category, attributes: ["id", "name"] }] });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, hsnCode, uom, price, isActive, categoryId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (categoryId) {
      const cat = await Category.findByPk(categoryId);
      if (!cat) return res.status(404).json({ message: "Category not found" });
      product.CategoryId = categoryId;
    }
    if (name && name.length < 3) return res.status(400).json({ message: "name must be >= 3" });
    await product.update({ name, description, hsnCode, uom, price, isActive, CategoryId: product.CategoryId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
