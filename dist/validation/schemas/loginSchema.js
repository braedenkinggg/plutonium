"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'username is required',
            invalid_type_error: 'username must be a string'
        }).min(3, 'Invlaid Username or Password'),
        password: (0, zod_1.string)({
            required_error: 'password is required',
            invalid_type_error: 'password must be a string'
        }).min(8, 'Invlaid Username or Password')
    })
});
exports.default = loginSchema;
