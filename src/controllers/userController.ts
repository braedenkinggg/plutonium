import { Request, Response, NextFunction } from 'express';

import User from '../models/User';
import ApiError from '../errors/APIError';

// Get a user
export async function getUser(req: Request, res: Response, next: NextFunction) {
    const { uname } = req.params;

    try {
        // Check if user exists
        const user = await User.findOne({username: uname}).populate('posts');
        if (!user) return next(new ApiError(404, 'User not found'));

        return res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }
}

export default { getUser };