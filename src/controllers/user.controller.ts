/*
    User controller handles
    reading, updating, and 
    deleting users.
*/

import { Request, Response, NextFunction } from 'express';

import UserModel from '../models/user.model';
import HttpError from '../utils/exceptions/HttpError';

export default class UserController {

    public static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserModel.findOne({ username: req.params.username})
                .populate('posts', 'title content category');
            
            if (!user) {
                return next(new HttpError(404, 'User not found'));
            }
            
            res.status(200).json({
                username: user.username,
                fullName: user.fullName,
                posts: user.posts
            });
        } catch (err: any) {
            next(err);
        }
    }
}