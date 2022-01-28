"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const postSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'title is required',
            invalid_type_error: 'title must be a string'
        }),
        content: (0, zod_1.string)({
            required_error: 'content is required',
            invalid_type_error: 'content must be a string'
        }),
    })
});
exports.default = postSchema;
