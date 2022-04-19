import { Request, Response, NextFunction } from 'express';

import APIError from '../errors/APIError';

function validateSession(req: Request, res: Response, next: NextFunction) {
    if(!req.session.userId) {
        return next(new APIError(403, 'Please login to complete this action'));
    }

    return next();
}

export default validateSession;