import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import ApiError from '../utils/errors/ApiError';

class AuthController {

    // Signup
    public static async signup(req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = req.body;

        try {
            const newUser = await User.create({ 
                username, 
                email, 
                password 
            });

            res.status(201).json(newUser);
        } catch(err: any) {
            if (err.code === 11000) {
                return next(new ApiError(409, 'User already exists'));
            }

            next(err);
        }
    }

    // Login
    public static async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            // Check if user exists
            if (!user) {
                return next(new ApiError(404, 'User does not exist'));
            }

            const validPassword = await user.verifyPassword(password);
            // Check if password is valid
            if (!validPassword) {
                return next(new ApiError(400, 'Incorrect password'));
            }

            req.session.userId = user.id;
            res.status(200).json(user);
        } catch (err: any) {
            next(err);
        }
    }

    // Logout
    public static async logout(req: Request, res: Response, next: NextFunction) {
        await req.session.destroy(() => {
            try {
                res.clearCookie('sid');
                res.status(200).json('Successfully logged out user');
            } catch (err: any) {
                next(err);
            }
        });
    }
}

export default AuthController;