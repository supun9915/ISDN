import express from "express";
import roleController from "../controllers/role.controller";

const router = express.Router();

// Get all roles
router.get("/", roleController.getAllRoles);

export default router;
