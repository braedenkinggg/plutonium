"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.createPost = exports.getOnePost = exports.getAllPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const APIError_1 = __importDefault(require("../errors/APIError"));
// Get all posts
async function getAllPosts(req, res, next) {
    try {
        const posts = await Post_1.default.find().populate('author', 'username');
        return res.status(200).json(posts);
    }
    catch (err) {
        next(err);
    }
}
exports.getAllPosts = getAllPosts;
// Get one post
async function getOnePost(req, res, next) {
    const { postId } = req.params;
    try {
        // Check if the post exists
        const post = await Post_1.default.findById(postId).populate('author', 'username');
        if (!post)
            return next(new APIError_1.default(404, 'Post not found'));
        return res.status(200).json(post);
    }
    catch (err) {
        next(err);
    }
}
exports.getOnePost = getOnePost;
// Create a post
async function createPost(req, res, next) {
    const { userId } = req.session;
    const { title, content, category } = req.body;
    try {
        const newPost = await Post_1.default.create({
            author: userId,
            title: title,
            content: content,
            category: category,
        });
        return res.status(200).json(newPost);
    }
    catch (err) {
        return next(err);
    }
}
exports.createPost = createPost;
// Edit a post
async function editPost(req, res, next) {
    const { postId } = req.params;
    const { userId } = req.session;
    try {
        // Check if the post exists
        const post = await Post_1.default.findById(postId).populate('author', 'id');
        if (!post)
            return next(new APIError_1.default(404, 'Post not found'));
        // Check if user is the post author
        const authorId = post.author.id;
        if (userId !== authorId)
            return next(new APIError_1.default(403, 'Cannot edit other users posts'));
        // Update the post
        await post.update({ $set: req.body });
        return res.status(200).json('Successfully updated post');
    }
    catch (err) {
        return next(err);
    }
}
exports.editPost = editPost;
// Delete a post
async function deletePost(req, res, next) {
    const { postId } = req.params;
    const { userId } = req.session;
    try {
        // Check if the post exists
        const post = await Post_1.default.findById(postId).populate('author', 'id');
        if (!post)
            return next(new APIError_1.default(404, 'Post not found'));
        // Check if user is the post author
        const authorId = post.author.id;
        if (userId !== authorId)
            return next(new APIError_1.default(403, 'Cannot delete other users posts'));
        // Delete post
        await post.deleteOne();
        return res.status(200).json('The post has been deleted');
    }
    catch (err) {
        return next(err);
    }
}
exports.deletePost = deletePost;
exports.default = { getAllPosts, getOnePost, createPost, editPost, deletePost };
