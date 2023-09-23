import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    images: {
        type: String,
        required: [true, 'Please enter product image'],
    },
    type: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },
    rating: {
        type: Number,
        required: [true, 'Please enter product rating'],
    },
    countInStock: {
        type: Number,
        required: true,
    },
    discount: { type: String },
    seller: { type: Number },
    description: { type: String },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: { type: Number, required: true },
            comment: {
                type: String,
            },
            image: { type: String },
        },
    ],
    numOfReviews: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
