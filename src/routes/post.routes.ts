import { Router } from 'express';

import addPostSchema from '../validations/schemas/addPostSchema';
import validateSchema from '../validations/validateSchema';
import validateSession from '../validations/validateSession';
import PostController from '../controllers/post.controller';

const postRouter = Router();

postRouter.get(
    '/',
    validateSession,
    PostController.getAllPosts
);

postRouter.get(
    '/:id',
    validateSession,
    PostController.getPost
);

postRouter.post(
    '/new',
    validateSession,
    validateSchema(addPostSchema),
    PostController.createPost
);

postRouter.put(
    '/:id',
    validateSession,
    PostController.updatePost
);

postRouter.delete(
    '/:id',
    validateSession,
    PostController.deletePost
);

export default postRouter;