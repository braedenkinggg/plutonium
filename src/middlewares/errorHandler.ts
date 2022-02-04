import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/exceptions/ApiError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
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