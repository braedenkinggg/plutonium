import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import ApiError from '../utils/errors/ApiError';

class UserController {

    // Get a user
    public static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ username: req.params.username })
                .populate('posts');

            // Check if user exists
            if (!user) {
                return next(new ApiError(404, 'User not found'));
            }

            res.status(200).json(user);
        } catch (err: any) {
            next(err);
        }
    }
}

export default UserController;