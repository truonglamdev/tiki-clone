import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please, Enter your name!'],
            maxLength: [50, 'Name cannot exceed 50 characters'],
            minLength: [2, 'Name should have more than 2 characters'],
            uppercase: true,
        },
        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
    },

    { timestamps: true },
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
