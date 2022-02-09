import { Schema, Document, model } from 'mongoose';

import { IUser } from './user.model';

export interface IPost extends Document {
    author: IUser;
    title: string;
    content: string;
    category: string;
}

export const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },

        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true,
            max: 1000
        },

        category: {
            type: String,
            default: 'General'
        },
    },

    { timestamps: true }
);

const Post = model<IPost>('posts', PostSchema);
export default Post;