import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import { createCoupon, updateCoupon, getAllCoupons, getCoupon, deleteCoupon } from '../controllers/couponController.js';
const router = express.Router();

router.post('/coupon', authMiddleware, createCoupon);
router.put('/coupon/:id', authMiddleware, updateCoupon);
router.get('/coupon/:id', authMiddleware, getCoupon);
router.delete('/coupon/:id', authMiddleware, deleteCoupon);
router.get('/coupons', authMiddleware, getAllCoupons);
export default router;
