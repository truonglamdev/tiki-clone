import Category from '../models/categoryModel.js';
import createMessage from '../utils/createMessage.js';

const createCategoryService = async (newCategory) => {
    try {
        const isExistCategory = await Category.findOne(newCategory);
        if (isExistCategory) {
            return createMessage(200, 'Category already exist ', { data: isExistCategory });
        }
        const createCategory = await Category.create(newCategory);
        return createMessage(200, 'Create category successfully', { data: createCategory });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getCategoryService = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            return createMessage(404, 'Category not found');
        }
        return createMessage(200, 'Success', { data: category });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllCategoriesService = async () => {
    try {
        const allCategories = await Category.find();
        return createMessage(200, 'Success', { data: allCategories });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateCategoryService = async (id, title) => {
    try {
        const categoryUpdated = await Category.findByIdAndUpdate(id, title, { new: true });
        if (!categoryUpdated) {
            createMessage(400, 'Update category failed');
        }
        return createMessage(200, 'Update category successfully', { data: categoryUpdated });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteCategoryService = async (id) => {
    try {
        await Category.findByIdAndDelete(id);
        return createMessage(200, 'Delete category success ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export {
    createCategoryService,
    deleteCategoryService,
    getAllCategoriesService,
    getCategoryService,
    updateCategoryService,
};
