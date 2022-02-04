import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import Post from '../models/post.model';
import ApiError from '../utils/exceptions/ApiError';

export default class PostController {

    public static createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Post.create({ 
                author: req.session.userId, 
                ...req.body
            });

            const author = await User.findById(req.session.userId);
            author!.posts.push(post.id);
            author!.save();

            res.redirect(`/post/${post.id}`);
        } catch (err: any) {
            return next(err);
        }
    }

    public static getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await Post.find()
                .populate('author', 'username');

            if (!posts.length) return next();

            res.status(200).json(posts);
        } catch (error: any) {
            next(error);
        }
    }

    public static getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Post.findById(req.params.postId)
                .populate('author', 'username');

            if (!post) return next();

            res.status(200).json(post);
        } catch (err: any) {
            next(err);
        }
    }

    public static updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Post.findById(req.params.postId)
                .populate('author', 'id');

            if (!post) return next();
            if (req.session.userId !== post.author.id) {
                return next(new ApiError(403, 'Forbidden'));
            }

            await post.updateOne({
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });
                
            res.redirect(`/post/${post.id}`);
        } catch (err: any) {
            next(err);
        }
    }
}