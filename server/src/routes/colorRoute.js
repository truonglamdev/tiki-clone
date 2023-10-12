import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import { createColor, deleteColor, getAllColors, getColor, updateColor } from '../controllers/colorController.js';
const router = express.Router();

router.post('/color', authMiddleware, createColor);
router.put('/color/:id', authMiddleware, updateColor);
router.get('/color/:id', getColor);
router.delete('/color/:id', authMiddleware, deleteColor);
router.get('/colors', getAllColors);
export default router;
