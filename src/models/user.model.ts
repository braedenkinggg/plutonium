import mongoose from 'mongoose';
import argon2 from 'argon2';

import UserDocument from '../interfaces/user.interface';

const userSchema = new mongoose.Schema<UserDocument>(
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
        }
    }, 
    { timestamps: true }
);

userSchema.pre<UserDocument>('save', async function(next) {
    if (!this.isModified('password')) return next();

    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;

    return next();
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;