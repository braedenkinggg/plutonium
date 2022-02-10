import { Router } from 'express';

import signupSchema from '../validations/schemas/signupSchema';
import loginSchema from '../validations/schemas/loginSchema';
import validateSchema from '../validations/validateSchema';
import validateSession from '../validations/validateSession';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post(
    '/signup',
    validateSchema(signupSchema),
    AuthController.signup
);

authRouter.post(
    '/login',
    validateSchema(loginSchema),
    AuthController.login
);

authRouter.post(
    '/logout',
    validateSession,
    AuthController.logout
);

export default authRouter;