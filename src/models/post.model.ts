import mongoose from 'mongoose';

import PostDocument from '../interfaces/post.interface';

const postSchema = new mongoose.Schema<PostDocument>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        tags: [String],
        sources: [String],
    },
    { timestamps: true }
);

const PostModel = mongoose.model('posts', postSchema);
export default PostModel;