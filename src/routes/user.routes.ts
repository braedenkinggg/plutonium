import { Router } from 'express';

import validateSession from '../validations/validateSession';
import UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get(
    '/:username',
    validateSession,
    UserController.getUser
);

export default userRouter;