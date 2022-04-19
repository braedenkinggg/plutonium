"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../errors/APIError"));
function validateSchema(schema) {
    return (req, res, next) => {
        try {
            schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        }
        catch (err) {
            return next(new APIError_1.default(400, err.issues[0].message));
        }
    };
}
exports.default = validateSchema;
