import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let imageUrl = req.body.imageUrl || "";
        let imagePublicId = "";

        if (req.file) {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "post_images");
            imageUrl = cloudinaryResult.url;
            imagePublicId = cloudinaryResult.publicId;
        }

        const trimmedText = text ? text.trim() : "";

        if (!trimmedText && !imageUrl) {
            return res.status(400).json({ message: "A post must contain text, an image, or both." });
        }

        const newPost = new Post({
            user: req.user._id,
            username: req.user.username,
            text: trimmedText,
            imageUrl,
            imagePublicId
        });

        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Error creating post", error: error.message });
    }
};

export const getFeed = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const { cursor } = req.query;

        const query = cursor ? { createdAt: { $lt: new Date(cursor) } } : {};
        
        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .populate("user", "username avatarUrl")
            .populate("comments.user", "username avatarUrl")
            .limit(limit);

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching feed:", error);
        return res.status(500).json({ message: "Error fetching feed", error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "username avatarUrl")
            .populate("comments.user", "username avatarUrl");
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ message: "Error fetching post", error: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userIdStr = req.user._id.toString();
        const likeIndex = post.likes.findIndex(
            (like) => (like.user ? like.user.toString() : like.toString()) === userIdStr
        );

        if (likeIndex === -1) {
            post.likes.push({
                user: req.user._id,
                username: req.user.username,
            });
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        return res.status(200).json({
            message: likeIndex === -1 ? "Post liked" : "Post unliked",
            likesCount: post.likes.length,
            likes: post.likes,
            post
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        return res.status(500).json({ message: "Error toggling like", error: error.message });
    }
};

export const addComment = async (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ message: "Comment text is required" });
    }

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        const newComment = {
            user: req.user._id,
            username: req.user.username,
            text: text.trim()
        };

        post.comments.push(newComment);
        await post.save();
        return res.status(201).json({
            message: "Comment added successfully",
            commentsCount: post.comments.length,
            comments: post.comments,
            post
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        if (post.imagePublicId) {
            await deleteFromCloudinary(post.imagePublicId);
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};