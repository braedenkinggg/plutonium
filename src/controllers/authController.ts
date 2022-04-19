import { Request, Response, NextFunction } from 'express';

import User from '../models/User';
import ApiError from '../errors/APIError';

// Register
export async function register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    try {
        const newUser = await User.create({ 
            username: username, 
            email: email, 
            password: password, 
        });

        req.session.userId = newUser.id;
        return res.status(200).json(newUser);
    } catch(err: any) {
        if(err.code === 11000) return next(new ApiError(409, 'User already exists'));
        next(err);
    }
}

// Login
export async function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({username});
        if(!user) return next(new ApiError(404, 'User does not exist'));

        // Check if password is valid
        const validPassword = await user.verifyPwd(password);
        if(!validPassword) return next(new ApiError(400, 'Incorrect password'));

        // Login user
        req.session.userId = user.id;
        return res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }
}

// Logout
export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        req.session.destroy(() => res.clearCookie('sid'));
        return res.status(200).json('User has been logged out');
    } catch(err: any) {
        next(err);
    }
}

export default { register, login, logout }