import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please, Enter your email!'],
            maxLength: [50, 'Name cannot exceed 50 characters'],
            minLength: [4, 'Name should have more than 4 characters'],
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
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
