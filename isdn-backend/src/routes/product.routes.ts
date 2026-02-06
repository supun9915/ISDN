import express from "express";
import productController from "../controllers/product.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Get all products - public access
router.get("/", productController.getAllProducts);

// Get products by category - public access (must come before /:id)
router.get("/category/:categoryId", productController.getProductsByCategory);

// Get product by ID - public access
router.get("/:id", productController.getProductById);

// All product modification routes require authentication
router.use(authenticate);

// Create new product
router.post(
  "/",
  authorize(["Super Admin", "Admin"]),
  productController.createProduct,
);

// Update product
router.put(
  "/:id",
  authorize(["Super Admin", "Admin"]),
  productController.updateProduct,
);

// Delete product
router.delete(
  "/:id",
  authorize(["Super Admin"]),
  productController.deleteProduct,
);

// Activate product
router.patch(
  "/:id/activate",
  authorize(["Super Admin", "Admin"]),
  productController.activateProduct,
);

// Deactivate product
router.patch(
  "/:id/deactivate",
  authorize(["Super Admin", "Admin"]),
  productController.deactivateProduct,
);

export default router;
