"use strict";
/*
    Auth controller handles
    creating, updating, and
    deleting sessions as well
    as creating users.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const HttpError_1 = __importDefault(require("../utils/exceptions/HttpError"));
class Auth {
}
_a = Auth;
Auth.signup = async (req, res, next) => {
    const userData = req.body;
    try {
        const newUser = await user_model_1.default.create({
            ...userData,
            username: userData.username.toLowerCase(),
            email: userData.email.toLowerCase(),
        });
        req.session.userId = newUser._id;
        res.redirect(`/${newUser.username}`);
    }
    catch (error) {
        if (error.code === 11000) {
            return next(new HttpError_1.default(409, 'User already exists!'));
        }
        next(error);
    }
};
Auth.login = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({ username: req.body.username });
        if (!user) {
            return next(new HttpError_1.default(404, 'User does not exist'));
        }
        const validPassword = await user.verifyPassword(req.body.password);
        if (!validPassword) {
            return next(new HttpError_1.default(400, 'Incorrect Password!'));
        }
        req.session.userId = user._id;
        res.redirect(`/${user.username}`);
    }
    catch (error) {
        next(error);
    }
};
exports.default = Auth;
