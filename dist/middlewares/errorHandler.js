"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../utils/exceptions/HttpError"));
function handleErrors(error, req, res, next) {
    if (error instanceof HttpError_1.default) {
        return res.status(error.statusCode).json({
            error: true,
            statusCode: error.statusCode,
            message: error.message
        });
    }
    res.status(500).json({
        error: true,
        statusCode: error.statusCode,
        message: error.message
    });
}
exports.default = handleErrors;
