import {
    createBlogCategoryService,
    deleteBlogCategoryService,
    getAllBlogCategoriesService,
    getBlogCategoryService,
    updateBlogCategoryService,
} from '../services/blogCategoryService.js';

import validateMongoDbId from '../utils/validateMongoDbId.js';

const createBlogCategory = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ message: 'Blog category is required' });
        }
        const response = await createBlogCategoryService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getBlogCategoryService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllBlogCategories = async (req, res) => {
    try {
        const response = await getAllBlogCategoriesService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateBlogCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        validateMongoDbId(id);
        if (!title) {
            return res.status(404).json({ message: 'Brand title is required' });
        }
        const response = await updateBlogCategoryService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await deleteBlogCategoryService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createBlogCategory, deleteBlogCategory, getAllBlogCategories, getBlogCategory, updateBlogCategory };

