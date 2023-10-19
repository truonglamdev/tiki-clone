import {
    DislikeTheBlogService,
    createBlogService,
    deleteBlogService,
    getAllBlogsService,
    getBlogService,
    likeTheBlogService,
    updateBlogService,
} from '../services/blogService.js';
import validateMongoDbId from '../utils/validateMongoDbId.js';

const createBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(404).json({ message: 'Invalid or missing title or description or category' });
        }
        const response = await createBlogService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getBlogService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const response = await getAllBlogsService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);

        const response = await updateBlogService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await deleteBlogService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const likeTheBlog = async (req, res) => {
    try {
        const response = await likeTheBlogService(req);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const dislikeTheBlog = async (req, res) => {
    try {
        const response = await DislikeTheBlogService(req);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};
export { createBlog, getBlog, getAllBlogs, updateBlog, deleteBlog, likeTheBlog, dislikeTheBlog };
