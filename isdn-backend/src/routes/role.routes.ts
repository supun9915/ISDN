import express from "express";
import roleController from "../controllers/role.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// All role routes require authentication and admin/manager role
router.use(authenticate);
router.use(authorize(["admin", "manager"]));

// Get all roles
router.get("/", roleController.getAllRoles);

export default router;
