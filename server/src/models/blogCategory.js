import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogCategorySchema = new Schema(
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

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

export default BlogCategory;
