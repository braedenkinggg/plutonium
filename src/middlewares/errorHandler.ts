import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/exceptions/HttpError';

function handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message
        });
    }
    
    res.status(500).json({
        error: true,
        statusCode: err.statusCode,
        message: err.message
    });
}

export default handleErrors;