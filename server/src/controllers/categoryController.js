import {
    createCategoryService,
    deleteCategoryService,
    getAllCategoriesService,
    getCategoryService,
    updateCategoryService,
} from '../services/categoryService.js';

import validateMongoDbId from '../utils/validateMongoDbId.js';

const createCategory = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ message: 'Blog category is required' });
        }
        const response = await createCategoryService(req.body);
        console.log('check response from category ', response);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getCategoryService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const response = await getAllCategoriesService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        validateMongoDbId(id);
        if (!title) {
            return res.status(404).json({ message: 'Brand title is required' });
        }
        const response = await updateCategoryService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await deleteCategoryService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory };
