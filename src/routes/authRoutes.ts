import { Router } from 'express';

// Import Controller
import { register, login, logout } from '../controllers/authController';

// Import validation
import signupSchema from '../validation/schemas/registerSchema';
import loginSchema from '../validation/schemas/loginSchema';
import validateSchema from '../validation/validateSchema';
import validateSession from '../validation/validateSession';

const authRouter = Router();

authRouter.post('/register', validateSchema(signupSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.post('/logout', validateSession, logout);

export default authRouter;