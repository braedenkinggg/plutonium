import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/exceptions/HttpError';

function handleErrors(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({
            error: true,
            statusCode: error.statusCode,
            message: error.message
        });
    }
    
    return res.status(500).json({
        error: true,
        statusCode: error.statusCode,
        message: error.message
    });
}

export default handleErrors;