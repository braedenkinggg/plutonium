import { Request, Response, NextFunction } from 'express';

import Post from '../models/post.model';
import ApiError from '../utils/errors/ApiError';

class PostController {

    // Create a Post
    public static async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const newPost = await Post.create({ 
                author: req.session.userId, 
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });

            res.status(201).json(newPost);
        } catch (err: any) {
            return next(err);
        }
    }

    // Get All Posts
    public static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await Post.find()
                .populate('author', '-password');

            res.status(200).json(posts);
        } catch (err: any) {
            next(err);
        }
    }

    // Get One Post
    public static async getPost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author', '-password');

            // Check if post exists
            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            res.status(200).json(post);
        } catch (err: any) {
            next(err);
        }
    }

    // Edit Post
    public static async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author', 'id');

            // Check if post exists
            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            // Check if logged in user is post author
            if (req.session.userId !== post.author.id) {
                return next(new ApiError(403, 'Cannot edit other users posts'));
            }

            // Update post
            await post.updateOne({ $set: req.body });
            res.status(200).json('Successfully updated post');
        } catch (err: any) {
            return next(err);
        }
    }

    // Delete Post
    public static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author', 'id');

            // Check if post exists
            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            // Check if user logged in is post author
            if (req.session.userId !== post.author.id) {
                return next(new ApiError(403, 'Cannot delete other users posts'));
            }

            // Delete post
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        } catch (err: any) {
            return next(err);
        }
    }
}

export default PostController;