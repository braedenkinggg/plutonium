// Import dependencies
const { Router } = require("express");

// Import controller
const { getAllPosts, getOnePost, createPost, editPost, deletePost } = require("../controllers/postController");

// Import validation
const postSchema = require("../schemas/postSchema");
const validateSchema = require("../middlewares/validateSchema");
const validateSession = require("../middlewares/validateSession");

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/post/:postId", getOnePost);
postRouter.post("/post/new", validateSession, validateSchema(postSchema), createPost);
postRouter.put("/post/:postId", validateSession, editPost);
postRouter.delete("/post/:postId", validateSession, deletePost);

module.exports = postRouter;