"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import controller
const postController_1 = require("../controllers/postController");
// Import validation
const postSchema_1 = __importDefault(require("../validation/schemas/postSchema"));
const validateSchema_1 = __importDefault(require("../validation/validateSchema"));
const validateSession_1 = __importDefault(require("../validation/validateSession"));
const postRouter = (0, express_1.Router)();
postRouter.get('/', postController_1.getAllPosts);
postRouter.get('/:postId', postController_1.getOnePost);
postRouter.post('/new', validateSession_1.default, (0, validateSchema_1.default)(postSchema_1.default), postController_1.createPost);
postRouter.put('/:postId', validateSession_1.default, postController_1.editPost);
postRouter.delete('/:postId', validateSession_1.default, postController_1.deletePost);
exports.default = postRouter;
