import { Schema, Document, model } from 'mongoose';
import argon2 from 'argon2';

import { IPost } from './post.model';

export interface IUser extends Document {
    username: string;
    email: string;
    fullName: string;
    password: string;
    posts: [IPost];
    verifyPassword(requestPassword: string): Promise<boolean>;
}

export const UserSchema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'posts'
        }]
    }, 
    { 
        timestamps: true 
    }
);

UserSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next();

    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;

    return next();
});

UserSchema.methods.verifyPassword = async function(requestPassword: string) {
    try {
        return await argon2.verify(this.password, requestPassword);
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

const User = model<IUser>('users', UserSchema);
export default User;