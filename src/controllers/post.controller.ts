import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/exceptions/HttpError';

import PostModel from '../models/post.model';

class PostController {

    public static createPost = async (req: Request, res: Response, next: NextFunction) => {
        const postData = req.body;

        try {
            const newPost = await PostModel.create(postData);

            res.status(201).json({
                newPost: {
                    title: newPost.title,
                    content: newPost.content
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    public static getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await PostModel.find();
            if (posts.length === 0) {
                return next(new HttpError(404, 'No Posts Yet'));
            }

            res.status(200).json(posts);
        } catch (error: any) {
            next(error)
        }
    }
}

export default PostController;