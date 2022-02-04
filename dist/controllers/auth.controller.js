"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/exceptions/ApiError"));
class AuthController {
}
exports.default = AuthController;
_a = AuthController;
AuthController.signup = async (req, res, next) => {
    try {
        const user = await user_model_1.default.create({
            username: req.body.username.toLowerCase(),
            email: req.body.email.toLowerCase(),
            ...req.body
        });
        req.session.userId = user.id;
        res.redirect('/');
    }
    catch (err) {
        if (err.code === 11000) {
            return next(new ApiError_1.default(409, 'User already exists'));
        }
        next(err);
    }
};
AuthController.login = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({
            username: req.body.username
        });
        if (!user)
            return next();
        const validPassword = await user.verifyPassword(req.body.password);
        if (!validPassword) {
            return next(new ApiError_1.default(400, 'Incorrect password'));
        }
        req.session.userId = user.id;
        res.redirect('/');
    }
    catch (err) {
        next(err);
    }
};
AuthController.logout = async (req, res, next) => {
    try {
        await req.session.destroy((err) => {
            if (err) {
                return new ApiError_1.default(500, 'Could not log out at this time');
            }
            res.clearCookie('sid');
            res.status(200).json({
                sucess: 'sucessfully logged out user'
            });
        });
    }
    catch (err) {
        next(err);
    }
};
