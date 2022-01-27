"use strict";
/*
    Post controller handles
    creating, reading, updating,
    and deleting posts.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const HttpError_1 = __importDefault(require("../utils/exceptions/HttpError"));
class Posts {
}
_a = Posts;
Posts.create = async (req, res, next) => {
    try {
        const newPost = await post_model_1.default.create({
            author: req.session.userId,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        const postAuthor = await user_model_1.default.findById(req.session.userId);
        postAuthor.posts.push(newPost._id);
        postAuthor.save();
        res.redirect(`/post/${newPost._id}`);
    }
    catch (err) {
        return next(err);
    }
};
Posts.getAll = async (req, res, next) => {
    try {
        const posts = await post_model_1.default.find()
            .populate('author', 'username');
        if (posts.length === 0) {
            return next(new HttpError_1.default(404, 'No posts yet...'));
        }
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
};
Posts.getById = async (req, res, next) => {
    try {
        const post = await post_model_1.default.findById(req.params.postId)
            .populate('author', 'username');
        if (!post) {
            return next(new HttpError_1.default(404, 'This post does not exist!'));
        }
        res.status(200).json({
            author: post.author.username,
            title: post.title,
            content: post.content,
            category: post.category
        });
    }
    catch (err) {
        next(err);
    }
};
Posts.update = async (req, res, next) => {
    try {
        await post_model_1.default.findByIdAndUpdate(req.params.postId, {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        res.redirect('/');
    }
    catch (err) {
        next(err);
    }
};
Posts.delete = async (req, res, next) => {
    await post_model_1.default.findByIdAndDelete(req.params.postId);
    res.redirect('/');
};
exports.default = Posts;
