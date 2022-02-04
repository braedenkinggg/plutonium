"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const ApiError_1 = __importDefault(require("../utils/exceptions/ApiError"));
class PostController {
}
exports.default = PostController;
_a = PostController;
PostController.createPost = async (req, res, next) => {
    try {
        const post = await post_model_1.default.create({
            author: req.session.userId,
            ...req.body
        });
        const author = await user_model_1.default.findById(req.session.userId);
        author.posts.push(post.id);
        author.save();
        res.redirect(`/post/${post.id}`);
    }
    catch (err) {
        return next(err);
    }
};
PostController.getPosts = async (req, res, next) => {
    try {
        const posts = await post_model_1.default.find()
            .populate('author', 'username');
        if (!posts.length)
            return next();
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
};
PostController.getPost = async (req, res, next) => {
    try {
        const post = await post_model_1.default.findById(req.params.postId)
            .populate('author', 'username');
        if (!post)
            return next();
        res.status(200).json(post);
    }
    catch (err) {
        next(err);
    }
};
PostController.updatePost = async (req, res, next) => {
    try {
        const post = await post_model_1.default.findById(req.params.postId)
            .populate('author', 'id');
        if (!post)
            return next();
        if (req.session.userId !== post.author.id) {
            return next(new ApiError_1.default(403, 'Forbidden'));
        }
        await post.updateOne({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        res.redirect(`/post/${post.id}`);
    }
    catch (err) {
        next(err);
    }
};
