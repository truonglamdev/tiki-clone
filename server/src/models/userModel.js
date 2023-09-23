import mongoose from 'mongoose';
import cryptoJs from 'crypto-js';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please, Enter your email!'],
            maxLength: [50, 'Name cannot exceed 50 characters'],
            minLength: [2, 'Name should have more than 2 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please, enter your email!'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please, enter your password!'],
            minLength: [8, 'Password must be at least 8 characters'],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
        },
        city: { type: String },
        phone: { type: String },
        avatar: {
            type: String,
        },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
    },
    { timestamps: true },
);

userSchema.methods.generateResetPasswordToken = () => {
    const resetToken = cryptoJs.lib.WordArray.random(20).toString();

    userSchema.resetPasswordToken = resetToken;
    const expireTime = Date.now() + 60 * 15 * 60 * 1000;
    userSchema.resetPasswordExpires = expireTime;
    return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
