import express from "express";
import branchController from "../controllers/branch.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Get all branches
router.get("/", branchController.getAllBranches);

// Get branch by ID
router.get("/:id", branchController.getBranchById);

// All branch routes require authentication
router.use(authenticate);

// Create new branch
router.post(
  "/",
  authorize(["Super Admin", "Admin"]),
  branchController.createBranch,
);

// Update branch
router.put(
  "/:id",
  authorize(["Super Admin", "Admin"]),
  branchController.updateBranch,
);

// Delete branch
router.delete(
  "/:id",
  authorize(["Super Admin"]),
  branchController.deleteBranch,
);

// Activate branch
router.patch(
  "/:id/activate",
  authorize(["Super Admin", "Admin"]),
  branchController.activateBranch,
);

export default router;
