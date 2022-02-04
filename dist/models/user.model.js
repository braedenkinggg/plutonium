"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
    },
    biography: {
        type: String
    },
    link: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'posts'
        }]
}, {
    timestamps: true
});
exports.UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hashedPassword = await argon2_1.default.hash(this.password);
    this.password = hashedPassword;
    return next();
});
exports.UserSchema.methods.verifyPassword = async function (requestPassword) {
    try {
        return await argon2_1.default.verify(this.password, requestPassword);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
const User = (0, mongoose_1.model)('users', exports.UserSchema);
exports.default = User;
