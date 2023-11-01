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
    uploadProductImages,
    deleteProductImages,
} from '../controllers/productController.js';
import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import { productImgResize, uploadImage } from '../middlewares/uploadImage.js';
const router = express.Router();

//upload images products
router.post(
    '/product/upload-img/:id',
    authMiddleware,
    uploadImage.array('images', 10),
    productImgResize,
    uploadProductImages,
);
//delete images products
router.delete('/product/delete-img/:id', authMiddleware, deleteProductImages);

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
