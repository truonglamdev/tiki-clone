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
    category: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
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
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            star: { type: Number, required: true, default: 0 },
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
    averageStar: {
        type: Number,
        default: 0,
    },

    colors: { type: [Schema.Types.Mixed] },
    sizes: { type: [Schema.Types.Mixed] },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
