"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const argon2_1 = __importDefault(require("argon2"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'posts'
        }]
}, {
    timestamps: true
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const hashedPassword = await argon2_1.default.hash(this.password);
    this.password = hashedPassword;
    return next();
});
UserSchema.methods.verifyPassword = async function (requestPassword) {
    try {
        return await argon2_1.default.verify(this.password, requestPassword);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
const UserModel = mongoose_1.default.model('users', UserSchema);
exports.default = UserModel;
