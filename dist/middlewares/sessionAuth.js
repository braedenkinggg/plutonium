"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/exceptions/ApiError"));
const sessionAuth = (req, res, next) => {
    const { userId } = req.session;
    if (!userId) {
        return next(new ApiError_1.default(403, 'Forbidden'));
    }
    return next();
};
exports.default = sessionAuth;
