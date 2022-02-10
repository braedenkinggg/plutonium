import { Router } from 'express';

import addPostSchema from '../validations/schemas/addPostSchema';
import loginSchema from '../validations/schemas/loginSchema';
import signupSchema from '../validations/schemas/signupSchema';
import validateSchema from '../validations/validateSchema';
import validateSession from '../validations/validateSession';
import AuthController from '../controllers/auth.controller';
import PostController from '../controllers/post.controller';
import UserController from '../controllers/user.controller';

const router = Router();

router.post(
    '/signup', 
    validateSchema(signupSchema), 
    AuthController.signup
);

router.post(
    '/login', 
    validateSchema(loginSchema), 
    AuthController.login
);

router.post(
    '/logout', 
    validateSession,
    AuthController.logout
);

router.get(
    '/', 
    validateSession,
    PostController.getAllPosts
);

router.post(
    '/post/new', 
    validateSession,
    validateSchema(addPostSchema), 
    PostController.createPost
);

router.get(
    '/post/:id', 
    validateSession,
    PostController.getPost
);

router.put(
    '/post/:id', 
    validateSession,
    validateSchema(addPostSchema), 
    PostController.updatePost
);

router.delete(
    '/post/:id', 
    validateSession,
    PostController.deletePost
);

router.get(
    '/:username', 
    validateSession,
    UserController.getUser
);

export default router;