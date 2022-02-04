"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        fullName: (0, zod_1.string)({
            invalid_type_error: 'Full Name must be a string'
        }),
        biography: (0, zod_1.string)({
            invalid_type_error: 'Biography must be a string'
        }),
        link: (0, zod_1.string)({
            invalid_type_error: 'Github must be a string'
        })
    })
});
exports.default = userSchema;
