"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const APIError_1 = __importDefault(require("../errors/APIError"));
// Get a user
async function getUser(req, res, next) {
    const { uname } = req.params;
    try {
        // Check if user exists
        const user = await User_1.default.findOne({ username: uname }).populate('posts');
        if (!user)
            return next(new APIError_1.default(404, 'User not found'));
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}
exports.getUser = getUser;
exports.default = { getUser };
