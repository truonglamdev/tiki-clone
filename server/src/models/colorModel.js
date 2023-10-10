import mongoose from 'mongoose';
const { Schema } = mongoose;

const colorSchema = new Schema(
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

const Color = mongoose.model('Color', colorSchema);

export default Color;
