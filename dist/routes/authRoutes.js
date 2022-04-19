"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import Controller
const authController_1 = require("../controllers/authController");
// Import validation
const registerSchema_1 = __importDefault(require("../validation/schemas/registerSchema"));
const loginSchema_1 = __importDefault(require("../validation/schemas/loginSchema"));
const validateSchema_1 = __importDefault(require("../validation/validateSchema"));
const validateSession_1 = __importDefault(require("../validation/validateSession"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validateSchema_1.default)(registerSchema_1.default), authController_1.register);
authRouter.post('/login', (0, validateSchema_1.default)(loginSchema_1.default), authController_1.login);
authRouter.post('/logout', validateSession_1.default, authController_1.logout);
exports.default = authRouter;
