/* 
    Post controller handles
    creating, reading, updating,
    and deleting posts. 
*/

import { Request, Response, NextFunction } from 'express';

import PostModel from '../models/post.model';
import UserModel from '../models/user.model';

import HttpError from '../utils/exceptions/HttpError';

class Posts {

    public static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newPost = await PostModel.create({
                author: req.session.userId,
                title: req.body.title,
                content: req.body.content,
                category: req.body.category
            });

            const postAuthor = await UserModel.findById(req.session.userId);
            postAuthor.posts.push(newPost._id);
            postAuthor.save();

            res.redirect(`/post/${newPost._id}`);
        } catch (err: any) {
            return next(err);
        }
    }

    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
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

    public static getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await PostModel.findById(req.params.postId)
                .populate('author', 'username');

            if (!post) {
                return next(new HttpError(404, 'This post does not exist!'));
            }

            res.status(200).json({
                author: post.author.username,
                title: post.title,
                content: post.content,
                category: post.category
            });
        } catch (err: any) {
            next(err);
        }
    }

    public static update = async (req: Request, res: Response, next: NextFunction) => {
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

    public static delete = async (req: Request, res: Response, next: NextFunction) => {
        await PostModel.findByIdAndDelete(req.params.postId);
        
        res.redirect('/');
    }
}

export default Posts;