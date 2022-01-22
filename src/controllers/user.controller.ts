import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/exceptions/HttpError';

import UserModel from '../models/user.model';
import PostModel from '../models/post.model';

class UserController {

    public static getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return next(new HttpError(404, `Could not find @${username}`));
            }

            return res.status(200).json({
                user: {
                    fullName: user.fullName,
                    username: user.username
                },
                session: req.session
            });
        } catch (error: any) {
            next(error);
        }
    }

    public static getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        try {
            const userPosts = await PostModel.find({ author: { username: username } });
            if (userPosts.length === 0) {
                return next(new HttpError(404, 'This user has no posts'));
            }

            res.status(200).json(userPosts);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;