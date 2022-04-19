"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 35,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    name: {
        first: { type: String },
        last: { type: String },
    }
}, { toJSON: { virtuals: true } });
exports.userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const hashedPassword = await argon2_1.default.hash(this.password);
    this.password = hashedPassword;
    return next();
});
exports.userSchema.methods.verifyPwd = async function (clientPwd) {
    try {
        return await argon2_1.default.verify(this.password, clientPwd);
    }
    catch (err) {
        return false;
    }
};
exports.userSchema.virtual('posts', {
    ref: 'posts',
    localField: '_id',
    foreignField: 'author'
});
const User = (0, mongoose_1.model)('users', exports.userSchema);
exports.default = User;
