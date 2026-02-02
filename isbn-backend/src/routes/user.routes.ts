import express from "express";
import userController from "../controllers/user.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Change password (requires authentication)
router.patch(
  "/:id/change-password",
  authenticate,
  userController.changePassword,
);

// Get all users (requires authentication and admin role)
router.get(
  "/",
  authenticate,
  authorize(["Super Admin", "Admin"]),
  userController.getAllUsers,
);

// Get user by ID (requires authentication)
router.get("/:id", authenticate, userController.getUserById);

// Create new user (requires authentication and admin role)
router.post(
  "/",
  authenticate,
  authorize(["Super Admin", "Admin"]),
  userController.createUser,
);

// Update user (requires authentication)
router.put("/:id", authenticate, userController.updateUser);

// Delete user (requires authentication and admin role)
router.delete(
  "/:id",
  authenticate,
  authorize(["Super Admin"]),
  userController.deleteUser,
);

// Activate user (requires authentication and admin role)
router.patch(
  "/:id/activate",
  authenticate,
  authorize(["Super Admin"]),
  userController.activateUser,
);

export default router;
