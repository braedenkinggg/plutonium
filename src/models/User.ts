import { Schema, Document, model } from 'mongoose';
import argon2 from 'argon2';
import { Url } from 'url';

export interface IUser extends Document {
    username: string;
    email: string;
    fullName?: string;
    url?: string;
    github?: string;
    password: string;
    verifyPwd(clientPwd: string): Promise<boolean>;
}

export const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            min: 3,
            max: 20,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 35,
        },

        password: {
            type: String,
            required: true,
            min: 8,
        },
        
        name: {
            first: { type: String },
            last: { type: String },
        }
    }, 
    { toJSON: { virtuals: true } }
);

userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;

    return next();
});

userSchema.methods.verifyPwd = async function(clientPwd: string) {
    try {
        return await argon2.verify(this.password, clientPwd);
    } catch (err: any) {
        return false;
    }
}

userSchema.virtual('posts', {
    ref: 'posts',
    localField: '_id',
    foreignField: 'author'
});

const User = model<IUser>('users', userSchema);
export default User;