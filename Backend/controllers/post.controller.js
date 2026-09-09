import Post from "../models/post.model.js";
import User from "../models/User.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
    const { text } = req.body;
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "post_images");
        imageUrl = cloudinaryResult.url;
        imagePublicId = cloudinaryResult.publicId;
    }

    if (!text && !imageUrl) {
        return res.status(400).json({ message: "A post must contain text, an image, or both." });
    }

    try {
        const newPost = new Post({
            user: req.user._id,
            text,
            imageUrl,
            imagePublicId
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    }
};

export const getFeed = async (req, res) => {

    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const { cursor } = req.query;

        const query = cursor ? { createdAt: { $lt: new Date(cursor) } } : {
            
        };
        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture")
            .limit(limit);

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching feed:", error);
        return res.status(500).json({ message: "Error fetching feed" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture");
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ message: "Error fetching post" });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user._id.toString();
        const likeIndex = post.likes.indexOf(userId);

        if (likeIndex === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        return res.status(200).json({ likesCount: post.likes.length });
    } catch (error) {
        console.error("Error toggling like:", error);
        return res.status(500).json({ message: "Error toggling like" });
    }
};

export const addComment = async (req, res) => {
    const { text } = req.body;
    if (!text) {
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
            text
        };

        post.comments.push(newComment);
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Error adding comment" });
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

        await post.remove();
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Error deleting post" });
    }
};