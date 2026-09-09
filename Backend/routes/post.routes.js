import { Router } from "express";
import { createPost, getFeed, getPostById, toggleLike, addComment, deletePost } from "../controllers/post.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

// Public Feed - Get all posts
router.get("/", getFeed);

// Create a new post
router.post("/", authMiddleware, upload.single("image"), createPost);

// Get a specific post by ID
router.get("/:id", getPostById);

// Like / Unlike a post
router.post("/:id/like", authMiddleware, toggleLike);

// Comment on a post
router.post("/:id/comment", authMiddleware, addComment);

// Delete a specific post by ID
router.delete("/:id", authMiddleware, deletePost);

export default router;