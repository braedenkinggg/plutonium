/*
    Auth controller handles
    creating, updating, and
    deleting sessions as well
    as creating users.
*/ 

import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import HttpError from '../utils/exceptions/HttpError';

class Auth {
    
    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;

        try {
            const newUser = await UserModel.create({
                ...userData,
                username: userData.username.toLowerCase(),
                email: userData.email.toLowerCase(),
            });

            req.session.userId = newUser._id;
            res.redirect(`/${newUser.username}`);
        } catch(error: any) {
            if(error.code === 11000) {
                return next(new HttpError(409, 'User already exists!'));
            }

            next(error);
        }
    }

    public static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserModel.findOne({ username: req.body.username });
            if (!user) {
                return next(new HttpError(404, 'User does not exist'));
            }

            const validPassword = await user.verifyPassword(req.body.password);
            if (!validPassword) {
                return next(new HttpError(400, 'Incorrect Password!'));
            }

            req.session.userId = user._id;
            res.redirect(`/${user.username}`);
        } catch (error: any) {
            next(error);
        }
    }
}

export default Auth;