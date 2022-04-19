import { Router } from 'express';

// Import controller
import { getUser } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/:uname', getUser);

export default userRouter;