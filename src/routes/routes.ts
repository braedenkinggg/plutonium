import { Router } from 'express';

import sessionAuth from '../middlewares/sessionAuth';

import validateSchema from '../validation/validateSchema';
import signupSchema from '../validation/schemas/signupSchema';
import loginSchema from '../validation/schemas/loginSchema';
import postSchema from '../validation/schemas/postSchema';
import userSchema from '../validation/schemas/userSchema';

import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import PostController from '../controllers/post.controller';

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
    AuthController.logout
)

router.get(
    '/',
    PostController.getPosts
);

router.post(
    '/post/new',
    sessionAuth,
    validateSchema(postSchema),
    PostController.createPost
);

router.get(
    '/post/:postId',
    PostController.getPost
)

router.put(
    '/post/:postId',
    sessionAuth,
    validateSchema(postSchema),
    PostController.updatePost
);

router.get(
    '/:username',
    UserController.getUser
);

router.put(
    '/:username',
    sessionAuth,
    validateSchema(userSchema),
    UserController.updateUser
);

export default router;