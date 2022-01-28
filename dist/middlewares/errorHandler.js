"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../utils/exceptions/HttpError"));
function handleErrors(err, req, res, next) {
    if (err instanceof HttpError_1.default) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message
        });
    }
    res.status(500).json({
        error: true,
        statusCode: err.statusCode,
        message: err.message
    });
}
exports.default = handleErrors;
