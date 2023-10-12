import mongoose from 'mongoose';
const { Schema } = mongoose;

const brandSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
    },

    { timestamps: true },
);

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
