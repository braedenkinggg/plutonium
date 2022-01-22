import mongoose from 'mongoose';

interface PostDocument extends mongoose.Document {
    title: string;
    content: string;
    tags: [string];
    sources: [string];
}

export default PostDocument;