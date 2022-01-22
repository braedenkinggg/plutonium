import { Request, Response, NextFunction } from 'express';

import HttpError from '../../utils/exceptions/HttpError';

import UserModel from '../../models/user.model';

class SignupController {

    public static signup = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;

        try {
            const newUser = await UserModel.create({
                ...userData,
                username: userData.username.toLowerCase(),
                email: userData.email.toLowerCase(),
            });


            res.status(201).json({
                user: {
                    username: `@${newUser.username}`,
                    fullName: newUser.fullName
                },
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return next(new HttpError(409, 'User already exists!'));
            }

            return next(error);
        }
    }
}

export default SignupController;