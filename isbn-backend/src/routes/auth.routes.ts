import express from "express";
import authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// POST /api/auth/login
router.post("/login", authController.login);

// POST /api/auth/register
router.post("/register", authController.register);

// GET /api/auth/me (requires authentication)
router.get("/me", authenticate, authController.getCurrentUser);

export default router;
