import { Router } from 'express';

import addPostSchema from '../utils/schemas/addPostSchema';
import loginSchema from '../utils/schemas/loginSchema';
import signupSchema from '../utils/schemas/signupSchema';
import validate from '../middlewares/validate';

import AuthController from '../controllers/auth.controller';
import PostController from '../controllers/post.controller';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);

router.get('/', PostController.getPosts);
router.post('/post/new', validate(addPostSchema), PostController.createPost);
router.get('/post/:id', PostController.getPost);
router.put('/post/:id', validate(addPostSchema), PostController.updatePost);
router.delete('/post/:id', PostController.deletePost);

router.get('/:username', UserController.getUser);

export default router;