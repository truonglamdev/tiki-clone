import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const blogSchema = new Schema(
    {
        title: { type: String, required: [true, 'Blog name is required'] },
        description: { type: String, required: [true, 'Blog description is required'] },
        category: { type: String, required: [true, 'Category name is required'] },
        totalViews: { type: Number, default: 0 },
        isLiked: { type: Boolean, default: false },
        isDisliked: { type: Boolean, default: false },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        author: { type: String, default: 'Admin' },
        images: [],
    },
    {
        timestamps: true,
    },
);

blogSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

blogSchema.virtual('dislikeCount').get(function () {
    return this.disLikes.length;
});
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
