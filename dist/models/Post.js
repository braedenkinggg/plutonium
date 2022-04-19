"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PostSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'General'
    },
});
const Post = (0, mongoose_1.model)('posts', exports.PostSchema);
exports.default = Post;