import { Schema, Document, model } from 'mongoose';

import { IUser } from './User';

export interface IPost extends Document {
    author: IUser;
    title: string;
    content: string;
    category: string;
}

export const PostSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
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

const Post = model<IPost>('posts', PostSchema);
export default Post;