import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            default: 'General'
        }
    },
    { timestamps: true }
);

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;