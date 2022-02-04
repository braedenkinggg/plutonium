import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import ApiError from '../utils/exceptions/ApiError';

export default class AuthController {

    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.create({
                username: req.body.username.toLowerCase(),
                email: req.body.email.toLowerCase(),
                ...req.body
            });

            req.session.userId = user.id;
            res.redirect('/');
        } catch(err: any) {
            if(err.code === 11000) {
                return next(new ApiError(409, 'User already exists'));
            }

            next(err);
        }
    }

    public static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne({ 
                username: req.body.username 
            });
            
            if (!user) return next();

            const validPassword = await user.verifyPassword(req.body.password);

            if (!validPassword) {
                return next(new ApiError(400, 'Incorrect password'));
            }

            req.session.userId = user.id;
            res.redirect('/');
        } catch (err: any) {
            next(err);
        }
    }

    public static logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await req.session.destroy((err: any) => {
                if (err) {
                    return new ApiError(500, 'Could not log out at this time');
                }

                res.clearCookie('sid');
                res.status(200).json({ 
                    sucess: 'sucessfully logged out user' 
                });
            });
        } catch (err: any) {
            next(err);
        }
    }
}