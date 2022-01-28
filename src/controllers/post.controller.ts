/* 
    Post controller handles
    creating, reading, updating,
    and deleting posts. 
*/

import { Request, Response, NextFunction } from 'express';

import UserModel from '../models/user.model';
import PostModel from '../models/post.model';
import HttpError from '../utils/exceptions/HttpError';

export default class PostController {

    public static async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const newPost = await PostModel.create({
                author: req.session.userId,
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });

            const postAuthor = await UserModel.findById(req.session.userId);
            postAuthor!.posts.push(newPost._id);
            postAuthor!.save();

            res.redirect(`/posts/${newPost.id}`);
        } catch (err: any) {
            return next(err);
        }
    }

    public static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostModel.find()
                .populate('author', 'username');

            if (posts.length === 0) {
                return next(new HttpError(404, 'No posts yet...'));
            }

            res.status(200).json(posts);
        } catch (error: any) {
            next(error);
        }
    }

    public static async getPost(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await PostModel.findById(req.params.postId)
                .populate('author', 'username');

            if (!post) {
                return next(new HttpError(404, 'This post does not exist!'));
            }

            res.status(200).json({
                author: post.author,
                title: post.title,
                content: post.content,
                category: post.category
            });
        } catch (err: any) {
            next(err);
        }
    }

    public static async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            await PostModel.findByIdAndUpdate(req.params.postId, {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });

            res.redirect('/');
        } catch (err: any) {
            next(err);
        }
    }

    public static async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            await PostModel.findByIdAndDelete(req.params.postId);
            res.redirect('/');
        } catch (err: any) {
            next(err);
        }
    }
}