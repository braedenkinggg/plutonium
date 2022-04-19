import { Request, Response, NextFunction } from 'express';

import Post from '../models/Post';
import ApiError from '../errors/APIError';

// Get all posts
export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await Post.find().populate('author', 'username');
        return res.status(200).json(posts);
    } catch(err: any) {
        next(err);
    }
}

// Get one post
export async function getOnePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
        // Check if the post exists
        const post = await Post.findById(postId).populate('author', 'username');
        if(!post) return next(new ApiError(404, 'Post not found'));

        return res.status(200).json(post);
    } catch(err: any) {
        next(err);
    }
}

// Create a post
export async function createPost(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session;
    const { title, content, category } = req.body;

    try {
        const newPost = await Post.create({ 
            author: userId,
            title: title,
            content: content,
            category: category,
        });

        return res.status(200).json(newPost);
    } catch(err: any) {
        return next(err);
    }
}

// Edit a post
export async function editPost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.session;

    try {
        // Check if the post exists
        const post = await Post.findById(postId).populate('author', 'id');
        if(!post) return next(new ApiError(404, 'Post not found'));

        // Check if user is the post author
        const authorId = post.author.id;
        if(userId !== authorId) return next(new ApiError(403, 'Cannot edit other users posts'));

        // Update the post
        await post.update({ $set: req.body });
        return res.status(200).json('Successfully updated post');
    } catch(err: any) {
        return next(err);
    }
}

// Delete a post
export async function deletePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.session;

    try {
        // Check if the post exists
        const post = await Post.findById(postId).populate('author', 'id');
        if(!post) return next(new ApiError(404, 'Post not found'));

        // Check if user is the post author
        const authorId = post.author.id;
        if(userId !== authorId) return next(new ApiError(403, 'Cannot delete other users posts'));

        // Delete post
        await post.deleteOne();
        return res.status(200).json('The post has been deleted');
    } catch(err: any) {
        return next(err);
    }
}

export default { getAllPosts, getOnePost, createPost, editPost, deletePost }