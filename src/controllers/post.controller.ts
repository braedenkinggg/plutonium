import { Request, Response, NextFunction } from 'express';

import Post from '../models/post.model';
import ApiError from '../utils/errors/ApiError';

class PostController {

    public static async createPost(req: Request, res: Response, next: NextFunction) {
        const { title, content, category } = req.body;

        const newPost = new Post({ 
            author: req.session.userId, 
            title,
            content,
            category
        });

        try {
            const post = await newPost.save();
            res.status(201).json(post);
        } catch (err: any) {
            return next(err);
        }
    }

    public static async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await Post.find()
                .populate('author', '-password');

            res.status(200).json(posts);
        } catch (error: any) {
            next(error);
        }
    }

    public static async getPost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author', '-password');

            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            res.status(200).json(post);
        } catch (err: any) {
            next(err);
        }
    }

    public static async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author', '-password');

            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            if (post.author.id !== req.session.userId) {
                return next(new ApiError(403, 'Cannot edit other users posts'));
            }

            await post.updateOne({ $set: req.body });
            res.status(200).json('Successfully updated post');
        } catch (err: any) {
            return next(err);
        }
    }

    public static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await Post.findById(req.params.id)
                .populate('author');

            if (!post) {
                return next(new ApiError(404, 'Post not found'));
            }

            if (post.author.id !== req.session.userId) {
                return next(new ApiError(403, 'Cannot delete other users posts'));
            }

            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        } catch (err: any) {
            return next(err);
        }
    }
}

export default PostController;