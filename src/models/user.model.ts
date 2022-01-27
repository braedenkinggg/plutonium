import mongoose from 'mongoose';
import argon2 from 'argon2';

interface UserDocument extends mongoose.Document {
    username: string;
    fullName?: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema(
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }]
    }, 
    { 
        timestamps: true 
    }
);

UserSchema.pre<UserDocument>('save', async function(next) {
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

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;