import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderModel = new Schema(
    {
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                color: { type: String },
                count: { type: Number },
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: 'String',
            default: 'Not Processed',
            enum: ['Not Processed', 'Cash on Delivery', 'Processing', 'Dispatched', 'Cancelled', 'Delivered'],
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const Order = mongoose.model('Order', orderModel);

export default Order;
