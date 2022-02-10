"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.default) {
        return res.status(err.status).json({
            error: true,
            status: err.status,
            message: err.message
        });
    }
    res.status(500).json({
        error: true,
        status: 500,
        message: 'Internal Server Error'
    });
}
exports.default = errorHandler;
