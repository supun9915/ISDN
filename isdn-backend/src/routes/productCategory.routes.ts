import express from "express";
import productCategoryController from "../controllers/productCategory.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Get all categories - public access
router.get("/", productCategoryController.getAllCategories);

// Get category by ID - public access
router.get("/:id", productCategoryController.getCategoryById);

// All category modification routes require authentication
router.use(authenticate);

// Create new category
router.post(
  "/",
  authorize(["Super Admin", "Admin"]),
  productCategoryController.createCategory,
);

// Update category
router.put(
  "/:id",
  authorize(["Super Admin", "Admin"]),
  productCategoryController.updateCategory,
);

// Delete category
router.delete(
  "/:id",
  authorize(["Super Admin"]),
  productCategoryController.deleteCategory,
);

export default router;
