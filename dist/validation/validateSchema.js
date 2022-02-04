"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/exceptions/ApiError"));
function validateSchema(schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        }
        catch (error) {
            return next(new ApiError_1.default(400, error.issues[0].message));
        }
    };
}
exports.default = validateSchema;
