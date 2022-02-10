"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const signupSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'username is required',
            invalid_type_error: 'username must be a string'
        }).min(3, 'Usernames must be 3-20 characters long')
            .max(20, 'Usernames must be 3-20 characters long'),
        email: (0, zod_1.string)({
            required_error: 'email is required',
            invalid_type_error: 'email must be a string'
        }).email('email is not valid'),
        password: (0, zod_1.string)({
            required_error: 'password is required',
            invalid_type_error: 'password must be a string'
        }).min(8, 'password must be between 8-20 characters')
            .max(20, 'password must be between 8-20 characters'),
        confirmPassword: (0, zod_1.string)({
            required_error: 'confirmPassword is required',
            invalid_type_error: 'confirmPassword must be a string'
        })
    }).refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
});
exports.default = signupSchema;
