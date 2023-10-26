import fs from 'fs';
import Blog from '../models/blogModel.js';
import { cloudinaryUploadImg } from '../utils/cloudinary.js';
import createMessage from '../utils/createMessage.js';
import validateMongoDbId from '../utils/validateMongoDbId.js';

const createBlogService = async (newBlog) => {
    try {
        const createBlog = await Blog.create(newBlog);
        return createMessage(200, 'Success', { data: createBlog });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getBlogService = async (id) => {
    try {
        const blog = await Blog.findById(id).populate('likes').populate('disLikes');
        if (!blog) {
            return createMessage(404, 'Blog  not found');
        }
        blog.totalViews += 1;
        await blog.save();
        return createMessage(200, 'Success', { data: blog });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllBlogsService = async () => {
    try {
        const allBlogs = await Blog.find();
        return createMessage(200, 'Success', { data: allBlogs });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateBlogService = async (id, newBlog) => {
    try {
        const blogUpdate = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
        if (!blogUpdate) {
            createMessage(400, 'Update blog failed');
        }
        return createMessage(200, 'Success', { data: blogUpdate });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteBlogService = async (id) => {
    try {
        await Blog.findByIdAndDelete(id);
        return createMessage(200, 'Delete success ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const likeOrDisLikeBlog = async (req, isLike) => {
    try {
        const { blogId } = req.body;
        const userId = req?.user.id;
        validateMongoDbId(blogId);
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return createMessage(404, ' Blog not found');
        }

        if (isLike) {
            const usersLikes = blog.likes;
            const isUserToLike = usersLikes.includes(userId);
            isUserToLike ? usersLikes.pull(userId) : usersLikes.push(userId);
            blog.isLiked = !isUserToLike;
        } else {
            const usersDislikes = blog.dislikes;
            const isUserToLike = usersDislikes.includes(userId);
            isUserToLike ? usersDislikes.pull(userId) : usersDislikes.push(userId);
            blog.isDisliked = !isUserToLike;
        }
        await blog.save();
        return createMessage(200, 'Success', { data: blog });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const likeTheBlogService = async (req) => {
    return likeOrDisLikeBlog(req, true);
};

const DislikeTheBlogService = async (req) => {
    return likeOrDisLikeBlog(req, false);
};

const uploadBlogImagesService = async (blogId, files) => {
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return createMessage(404, 'Blog not found');
        }

        const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = [];
        for (let file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            if (fs.existsSync(path)) {
                try {
                    fs.unlinkSync(path);
                } catch (err) {
                    console.error(`Error deleting file: ${err}`);
                }
            }
        }
        const newImages = urls.map((item) => ({ url: item.url, public_id: item.public_id }));
        blog.images = newImages;
        await blog.save();
        return createMessage(200, 'Success', { data: blog });
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export {
    createBlogService,
    deleteBlogService,
    getAllBlogsService,
    getBlogService,
    updateBlogService,
    likeTheBlogService,
    DislikeTheBlogService,
    uploadBlogImagesService,
};
