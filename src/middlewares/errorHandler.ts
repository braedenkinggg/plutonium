import { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message,
        });    
    }
    
    return res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error',
    });
}

export default errorHandler;