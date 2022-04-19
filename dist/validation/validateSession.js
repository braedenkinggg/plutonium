"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../errors/APIError"));
function validateSession(req, res, next) {
    if (!req.session.userId) {
        return next(new APIError_1.default(403, 'Please login to complete this action'));
    }
    return next();
}
exports.default = validateSession;
