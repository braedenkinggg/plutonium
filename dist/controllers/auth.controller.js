"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
class AuthController {
    // Signup
    static async signup(req, res, next) {
        const { username, email, password } = req.body;
        try {
            const newUser = await user_model_1.default.create({
                username,
                email,
                password
            });
            res.status(201).json(newUser);
        }
        catch (err) {
            if (err.code === 11000) {
                return next(new ApiError_1.default(409, 'User already exists'));
            }
            next(err);
        }
    }
    // Login
    static async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const user = await user_model_1.default.findOne({ username });
            // Check if user exists
            if (!user) {
                return next(new ApiError_1.default(404, 'User does not exist'));
            }
            const validPassword = await user.verifyPassword(password);
            // Check if password is valid
            if (!validPassword) {
                return next(new ApiError_1.default(400, 'Incorrect password'));
            }
            req.session.userId = user.id;
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    // Logout
    static async logout(req, res, next) {
        await req.session.destroy(() => {
            try {
                res.clearCookie('sid');
                res.status(200).json('Successfully logged out user');
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AuthController;
