import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';

import HttpError from '../../utils/exceptions/HttpError';

import UserModel from '../../models/user.model';

class LoginController {

    public static login = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
    
        try {
            const user = await UserModel.findOne({ username: username });
            if (!user) {
                return next(new HttpError(404, `@${username} does not exist`));
            }

            const match = await argon2.verify(user.password, password);
            if (!match) {
                return next(new HttpError(400, 'Incorrect Password!'));
            }

            res.status(200).json({
                user: {
                    username: user.username,
                    fullName: user.fullName
                }
            });
        } catch (error: any) {
            next(error);
        }
    }
}

export default LoginController;