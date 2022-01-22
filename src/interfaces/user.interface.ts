import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
    username: string;
    fullName?: string;
    email: string;
    password: string;
}

export default UserDocument;