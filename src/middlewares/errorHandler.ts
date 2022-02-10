import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/errors/ApiError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            error: true,
            status: err.status,
            message: err.message
        });    
    }
    
    res.status(500).json({
        error: true,
        status: 500,
        message: 'Internal Server Error'
    });
}