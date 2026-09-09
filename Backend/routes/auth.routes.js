import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

// Protected user profile routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, upload.single("avatar"), updateUserProfile);

export default router;