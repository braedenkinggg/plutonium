import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import ApiError from '../utils/exceptions/ApiError';

export default class UserController {

    public static getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne({ username: req.params.username })
                .populate('posts', 'title content category createdAt');
            
            if (!user) return next();

            res.status(200).json({
                username: user.username,
                fullName: user.fullName,
                biography: user.biography,
                link: user.link
            });
        } catch (err: any) {
            next(err);
        }
    }

    public static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne({ username: req.params.username });

            if (!user) return next();
            if (user.id !== req.session.userId) {
                return next(new ApiError(403, 'Forbidden'));
            }

            await user.updateOne(req.body);

            res.redirect(`/${user.username}`);
        } catch (err: any) {
            next(err);
        }
    }
}