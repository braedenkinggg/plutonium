"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../errors/APIError"));
function errorHandler(err, req, res, next) {
    if (err instanceof APIError_1.default) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    return res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error',
    });
}
exports.default = errorHandler;
