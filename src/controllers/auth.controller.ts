/*
    Auth controller handles
    creating, updating, and
    deleting sessions as well
    as creating users.
*/ 

import { Request, Response, NextFunction } from 'express';

import UserModel from '../models/user.model';
import HttpError from '../utils/exceptions/HttpError';

export default class AuthController {
    
    public static async signup(req: Request, res: Response, next: NextFunction) {
        const userData = req.body;

        try {
            const newUser = await UserModel.create({
                ...userData,
                username: userData.username.toLowerCase(),
                email: userData.email.toLowerCase()
            });

            req.session.userId = newUser._id;
            res.redirect(`/${newUser.username}`);
        } catch(err: any) {
            if(err.code === 11000) {
                return next(new HttpError(409, 'User already exists!'));
            }

            next(err);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction) {
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
        } catch (err: any) {
            next(err);
        }
    }
}