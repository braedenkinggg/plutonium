"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addPostSchema_1 = __importDefault(require("../utils/schemas/addPostSchema"));
const loginSchema_1 = __importDefault(require("../utils/schemas/loginSchema"));
const signupSchema_1 = __importDefault(require("../utils/schemas/signupSchema"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
router.post('/signup', (0, validate_1.default)(signupSchema_1.default), auth_controller_1.default.signup);
router.post('/login', (0, validate_1.default)(loginSchema_1.default), auth_controller_1.default.login);
router.post('/logout', auth_controller_1.default.logout);
router.get('/', post_controller_1.default.getPosts);
router.post('/post/new', (0, validate_1.default)(addPostSchema_1.default), post_controller_1.default.createPost);
router.get('/post/:id', post_controller_1.default.getPost);
router.put('/post/:id', (0, validate_1.default)(addPostSchema_1.default), post_controller_1.default.updatePost);
router.delete('/post/:id', post_controller_1.default.deletePost);
router.get('/:username', user_controller_1.default.getUser);
exports.default = router;
