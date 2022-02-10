"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
class UserController {
    // Get a user
    static async getUser(req, res, next) {
        try {
            const user = await user_model_1.default.findOne({ username: req.params.username })
                .populate('posts');
            // Check if user exists
            if (!user) {
                return next(new ApiError_1.default(404, 'User not found'));
            }
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = UserController;
