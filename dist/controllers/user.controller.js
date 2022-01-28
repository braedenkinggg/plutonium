"use strict";
/*
    User controller handles
    reading, updating, and
    deleting users.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const HttpError_1 = __importDefault(require("../utils/exceptions/HttpError"));
class UserController {
    static async getUser(req, res, next) {
        try {
            const user = await user_model_1.default.findOne({ username: req.params.username })
                .populate('posts', 'title content category');
            if (!user) {
                return next(new HttpError_1.default(404, 'User not found'));
            }
            res.status(200).json({
                username: user.username,
                fullName: user.fullName,
                posts: user.posts
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = UserController;
