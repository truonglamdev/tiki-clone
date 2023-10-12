import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from '../controllers/brandController.js';
const router = express.Router();

router.post('/brand', authMiddleware, createBrand);
router.put('/brand/:id', authMiddleware, updateBrand);
router.get('/brand/:id', getBrand);
router.delete('/brand/:id', authMiddleware, deleteBrand);
router.get('/brands', getAllBrands);
export default router;
