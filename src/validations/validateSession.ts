import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/errors/ApiError';

export default function validateSession(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return next(new ApiError(403, 'Please login to complete this action'));
    }

    return next();
}