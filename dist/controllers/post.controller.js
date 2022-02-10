"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
class PostController {
    // Create a Post
    static async createPost(req, res, next) {
        try {
            const newPost = await post_model_1.default.create({
                author: req.session.userId,
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });
            res.status(201).json(newPost);
        }
        catch (err) {
            return next(err);
        }
    }
    // Get All Posts
    static async getAllPosts(req, res, next) {
        try {
            const posts = await post_model_1.default.find()
                .populate('author', '-password');
            res.status(200).json(posts);
        }
        catch (err) {
            next(err);
        }
    }
    // Get One Post
    static async getPost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author', '-password');
            // Check if post exists
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            res.status(200).json(post);
        }
        catch (err) {
            next(err);
        }
    }
    // Edit Post
    static async updatePost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author', 'id');
            // Check if post exists
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            // Check if logged in user is post author
            if (req.session.userId !== post.author.id) {
                return next(new ApiError_1.default(403, 'Cannot edit other users posts'));
            }
            // Update post
            await post.updateOne({ $set: req.body });
            res.status(200).json('Successfully updated post');
        }
        catch (err) {
            return next(err);
        }
    }
    // Delete Post
    static async deletePost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author', 'id');
            // Check if post exists
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            // Check if user logged in is post author
            if (req.session.userId !== post.author.id) {
                return next(new ApiError_1.default(403, 'Cannot delete other users posts'));
            }
            // Delete post
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = PostController;
