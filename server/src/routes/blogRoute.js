import express from 'express';

import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import {
    createBlog,
    deleteBlog,
    dislikeTheBlog,
    getAllBlogs,
    getBlog,
    likeTheBlog,
    updateBlog,
    uploadBlogImages,
} from '../controllers/blogController.js';
import { blogImgResize, uploadImage } from '../middlewares/uploadImage.js';
const router = express.Router();

//upload images blogs
router.post('/blog/upload-img/:id', authMiddleware, uploadImage.array('images', 10), blogImgResize, uploadBlogImages);
router.post('/blog', authMiddleware, createBlog);
router.put('/blog/likes', authMiddleware, likeTheBlog);
router.put('/blog/dislikes', authMiddleware, dislikeTheBlog);
router.put('/blog/:id', authMiddleware, updateBlog);
router.get('/blog/:id', getBlog);
router.delete('/blog/:id', authMiddleware, deleteBlog);
router.get('/blogs', getAllBlogs);
export default router;
