import { Router } from "express";
import { createCategory, listCategories, getCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = Router();

router.post("/", createCategory);
router.get("/", listCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
