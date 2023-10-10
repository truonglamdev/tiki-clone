import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/color', authMiddleware, createColor);
router.put('/color/:id', authMiddleware, updateColor);
router.get('/color/:id', authMiddleware, getColor);
router.delete('/color/:id', authMiddleware, deleteColor);
router.get('/colors', authMiddleware, getAllColors);
export default router;
