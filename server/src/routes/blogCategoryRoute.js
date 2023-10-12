import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import {
    getAllBlogCategories,
    createBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    updateBlogCategory,
} from '../controllers/blogCategoryController.js';
const router = express.Router();

router.post('/blog-category', authMiddleware, createBlogCategory);
router.put('/blog-category/:id', authMiddleware, updateBlogCategory);
router.get('/blog-category/:id', getBlogCategory);
router.delete('/blog-category/:id', authMiddleware, deleteBlogCategory);
router.get('/blog-categories', getAllBlogCategories);
export default router;
