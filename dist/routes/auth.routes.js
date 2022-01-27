"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../validation/validation"));
const LoginSchema_1 = require("../validation/schemas/LoginSchema");
const RegisterSchema_1 = require("../validation/schemas/RegisterSchema");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.default)(RegisterSchema_1.registerSchema), controllers_1.authController.register);
router.post('/login', (0, validation_1.default)(LoginSchema_1.loginSchema), controllers_1.authController.login);
exports.default = router;
