import { Router } from 'express';

// Import controller
import { getAllPosts, getOnePost, createPost, editPost, deletePost } from '../controllers/postController';

// Import validation
import postSchema from '../validation/schemas/postSchema';
import validateSchema from '../validation/validateSchema';
import validateSession from '../validation/validateSession';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:postId', getOnePost);
postRouter.post('/new', validateSession, validateSchema(postSchema), createPost);
postRouter.put('/:postId', validateSession, editPost);
postRouter.delete('/:postId', validateSession, deletePost);

export default postRouter;