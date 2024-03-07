import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import {
    getAllCategories,
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from '../controllers/categoryController.js';
const router = express.Router();

router.post('/category', authMiddleware, createCategory);
router.put('/category/:id', authMiddleware, updateCategory);
router.get('/category/:id', getCategory);
router.delete('/category/:id', authMiddleware, deleteCategory);
router.get('/categories', getAllCategories);
export default router;
