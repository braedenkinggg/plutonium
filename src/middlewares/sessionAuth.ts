import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/errors/ApiError';

const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.session;
    
    if (!userId) {
        return next(new ApiError(403, 'Forbidden'));
    }

    return next();
}

export default sessionAuth;