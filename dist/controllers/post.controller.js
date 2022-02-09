"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
class PostController {
    static async createPost(req, res, next) {
        const { title, content, category } = req.body;
        const newPost = new post_model_1.default({
            author: req.session.userId,
            title,
            content,
            category
        });
        try {
            const post = await newPost.save();
            res.status(201).json(post);
        }
        catch (err) {
            return next(err);
        }
    }
    static async getPosts(req, res, next) {
        try {
            const posts = await post_model_1.default.find()
                .populate('author', '-password');
            res.status(200).json(posts);
        }
        catch (error) {
            next(error);
        }
    }
    static async getPost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author', '-password');
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            res.status(200).json(post);
        }
        catch (err) {
            next(err);
        }
    }
    static async updatePost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author', '-password');
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            if (post.author.id !== req.session.userId) {
                return next(new ApiError_1.default(403, 'Cannot edit other users posts'));
            }
            await post.updateOne({ $set: req.body });
            res.status(200).json('Successfully updated post');
        }
        catch (err) {
            return next(err);
        }
    }
    static async deletePost(req, res, next) {
        try {
            const post = await post_model_1.default.findById(req.params.id)
                .populate('author');
            if (!post) {
                return next(new ApiError_1.default(404, 'Post not found'));
            }
            if (post.author.id !== req.session.userId) {
                return next(new ApiError_1.default(403, 'Cannot delete other users posts'));
            }
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = PostController;
