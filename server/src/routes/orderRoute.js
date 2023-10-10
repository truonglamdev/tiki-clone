import express from 'express';
import {
    cancelOrder,
    createOrder,
    getAllOrdersAdmin,
    getAllOrdersUser,
    getOrders,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/order/', authUserMiddleware, createOrder);
router.put('/order/:id', authUserMiddleware, updateOrderStatus);
router.delete('/order/:id', authUserMiddleware, cancelOrder);
router.get('/order/:id', authUserMiddleware, getOrders);
router.get('/orders', authUserMiddleware, getAllOrdersUser);
router.get('/admin/orders', authMiddleware, getAllOrdersAdmin);

export default router;
