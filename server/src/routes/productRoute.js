import express from 'express';
import {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    deleteManyProduct,
    getAllProduct,
    searchProduct,
    addToWishlist,
    rateProduct,
} from '../controllers/productController.js';
import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.get('/product/:id', getDetailProduct);
router.delete('/product/:id', authMiddleware, deleteProduct);
router.delete('/products', authMiddleware, deleteManyProduct);
router.get('/products', getAllProduct);
router.get('/search', searchProduct);
router.put('/products/wishlist', authMiddleware, addToWishlist);
router.put('/products/review', authUserMiddleware, rateProduct);

export default router;
