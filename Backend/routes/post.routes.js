import { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/post.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

// Create a new post
router.post("/", authMiddleware, upload.single("image"), createPost);

// Get all posts
router.get("/", authMiddleware, getAllPosts);

// Get a specific post by ID
router.get("/:id", authMiddleware, getPostById);

// Update a specific post by ID
router.put("/:id", authMiddleware, upload.single("image"), updatePost);

// Delete a specific post by ID
router.delete("/:id", authMiddleware, deletePost);

export default router;