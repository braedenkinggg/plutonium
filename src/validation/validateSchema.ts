import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

import ApiError from '../utils/exceptions/ApiError';

function validateSchema(schema: AnyZodObject): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch (error: any) {
            return next(new ApiError(400, error.issues[0].message));
        }
    }
}

export default validateSchema;