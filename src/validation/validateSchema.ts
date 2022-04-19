import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

import ApiError from '../errors/APIError';

function validateSchema(schema: AnyZodObject): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch (err: any) {
            return next(new ApiError(400, err.issues[0].message));
        }
    }
}

export default validateSchema;