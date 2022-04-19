"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.message = message;
    }
}
exports.default = APIError;
