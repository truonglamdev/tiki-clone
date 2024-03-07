import BlogCategory from '../models/blogCategory.js';
import createMessage from '../utils/createMessage.js';

const createBlogCategoryService = async (newBlog) => {
    try {
        const isExistBlogCategory = await BlogCategory.findOne(newBlog);
        if (isExistBlogCategory) {
            return createMessage(200, 'BlogCategory already exist ', { data: isExistBlogCategory });
        }
        const createBCategory = await BlogCategory.create(newBlog);
        return createMessage(200, 'Success', { data: createBCategory });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getBlogCategoryService = async (id) => {
    try {
        const blog = await BlogCategory.findById(id);
        if (!blog) {
            return createMessage(404, 'Blog category not found');
        }
        return createMessage(200, 'Success', { data: blog });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllBlogCategoriesService = async () => {
    try {
        const allBlogs = await BlogCategory.find();
        return createMessage(200, 'Success', { data: allBlogs });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateBlogCategoryService = async (id, title) => {
    try {
        const blogUpdate = await BlogCategory.findByIdAndUpdate(id, title, { new: true });
        if (!blogUpdate) {
            createMessage(400, 'Update blog failed');
        }
        return createMessage(200, 'Success', { data: blogUpdate });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteBlogCategoryService = async (id) => {
    try {
        await BlogCategory.findByIdAndDelete(id);
        return createMessage(200, 'Delete success ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export {
    createBlogCategoryService,
    deleteBlogCategoryService,
    getAllBlogCategoriesService,
    getBlogCategoryService,
    updateBlogCategoryService,
};
