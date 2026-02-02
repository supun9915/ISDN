import express from "express";
import branchController from "../controllers/branch.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// All branch routes require authentication
router.use(authenticate);

// Get all branches (accessible to all authenticated users)
router.get("/", branchController.getAllBranches);

// Get branch by ID (accessible to all authenticated users)
router.get("/:id", branchController.getBranchById);

// Create new branch (admin and manager only)
router.post(
  "/",
  authorize(["Super Admin", "Admin"]),
  branchController.createBranch,
);

// Update branch (admin and manager only)
router.put(
  "/:id",
  authorize(["Super Admin", "Admin"]),
  branchController.updateBranch,
);

// Delete branch (admin only)
router.delete(
  "/:id",
  authorize(["Super Admin"]),
  branchController.deleteBranch,
);

// Activate branch (admin and manager only)
router.patch(
  "/:id/activate",
  authorize(["Super Admin", "Admin"]),
  branchController.activateBranch,
);

export default router;
