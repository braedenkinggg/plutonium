import { Schema, Document, model } from 'mongoose';
import argon2 from 'argon2';

export interface IUser extends Document {
    username: string;
    email: string;
    fullName: string;
    password: string;
    verifyPassword(requestPassword: string): Promise<boolean>;
}

export const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            min: 3,
            max: 20
        },

        email: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 35
        },

        password: {
            type: String,
            min: 8,
            max: 20,
            required: true
        },

        fullName: { 
            type: String 
        }
    }, 
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;

    return next();
});

userSchema.methods.verifyPassword = async function(clientPassword: string) {
    try {
        return await argon2.verify(this.password, clientPassword);
    } catch (err: any) {
        console.log(err);
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