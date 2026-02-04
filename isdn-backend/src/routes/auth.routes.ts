import express from "express";
import authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// user login
router.post("/login", authController.login);

// user registration
router.post("/register", authController.register);

// get current user
router.get("/log", authenticate, authController.getCurrentUser);

// logout
router.post("/logout", authenticate, authController.logout);

export default router;
