import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartModel = new Schema(
    {
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                color: { type: String },
                count: { type: Number },
                price: { type: Number },
            },
        ],
        cartTotal: { type: Number },
        totalAfterDiscount: { type: Number },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const Cart = mongoose.model('Cart', cartModel);

export default Cart;
