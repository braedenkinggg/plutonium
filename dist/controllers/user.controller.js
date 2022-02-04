"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/exceptions/ApiError"));
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.getUser = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({ username: req.params.username })
            .populate('posts', 'title content category createdAt');
        if (!user)
            return next();
        res.status(200).json({
            username: user.username,
            fullName: user.fullName,
            biography: user.biography,
            link: user.link
        });
    }
    catch (err) {
        next(err);
    }
};
UserController.updateUser = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({ username: req.params.username });
        if (!user)
            return next();
        if (user.id !== req.session.userId) {
            return next(new ApiError_1.default(403, 'Forbidden'));
        }
        await user.updateOne(req.body);
        res.redirect(`/${user.username}`);
    }
    catch (err) {
        next(err);
    }
};
