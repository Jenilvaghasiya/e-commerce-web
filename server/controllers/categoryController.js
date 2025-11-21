import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, isActive = true } = req.body;
    if (!name || name.length < 3) return res.status(400).json({ message: "name is required (min 3)" });
    const exists = await Category.findOne({ where: { name } });
    if (exists) return res.status(409).json({ message: "Category already exists" });
    const category = await Category.create({ name, isActive });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category", error: err.message });
  }
};

export const listCategories = async (_req, res) => {
  try {
    const categories = await Category.findAll({ order: [["created_at", "DESC"]] });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    if (name && name.length < 3) return res.status(400).json({ message: "name must be >= 3" });
    await category.update({ name, isActive });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category", error: err.message });
  }
};
