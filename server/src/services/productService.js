import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { cloudinaryDeleteImg, cloudinaryUploadImg } from '../utils/cloudinary.js';
import fs from 'fs';
import createMessage from '../utils/createMessage.js';
const createProductService = async (newProduct) => {
    try {
        const { name, images, category, countInStock, price, rating, discount, description } = newProduct;

        const createProduct = await Product.create({
            name,
            images,
            category,
            countInStock: Number(countInStock),
            price,
            rating,
            description,
            discount: Number(discount),
        });
        if (createProduct) {
            return createMessage(200, 'Create new product successfully', { data: createProduct });
        }
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateProductService = async (id, data) => {
    try {
        const productExist = await Product.findById(id);
        if (!productExist) {
            return createMessage(404, 'Product not found');
        }
        const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (updateProduct) {
            return createMessage(200, 'Product updated successfully', { data: updateProduct });
        }
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getDetailProductService = async (id) => {
    try {
        const productExist = await Product.findById(id);
        if (!productExist) {
            return createMessage(404, 'Product not found');
        }

        return createMessage(200, 'Success', { data: productExist });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteProductService = async (id) => {
    try {
        const productDeleted = await Product.findByIdAndDelete(id);
        if (!productDeleted) {
            return createMessage(404, 'Product not found');
        }

        return createMessage(200, 'Successfully deleted product');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteManyProductService = async (ids) => {
    try {
        await Product.deleteMany({ _id: { $in: ids } });
        return createMessage(200, 'Products deleted successfully');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const searchProductService = async (keyword, limit) => {
    try {
        const searchCondition = {
            $or: [{ name: { $regex: keyword, $options: 'i' } }],
        };

        // { description: { $regex: keyword, $options: 'i' } }

        const products = await Product.find(searchCondition).limit(limit);
        if (products.length > 0) {
            return createMessage(200, 'Success', { data: products });
        } else {
            return createMessage(200, 'Not Found', { data: [] });
        }
    } catch (error) {
        return createMessage(500, error.message);
    }
};

// const searchSuggestionProductService = async (keyword) => {
//     try {
//         const limitNumber = 10;
//         const searchCondition = {
//             $or: [{ name: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }],
//         };

//         const products = await Product.find(searchCondition).limit(limitNumber);
//         if (products.length > 0) {
//             return createMessage(200, 'Success', { data: products });
//         } else {
//             return createMessage(404, 'Not Found', { data: [] });
//         }
//     } catch (error) {
//         return createMessage(500, error.message);
//     }
// };

const getAllProductService = async (req) => {
    try {
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        const queryObj = { ...req.query };
        excludedFields.forEach((field) => delete queryObj[field]);
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));
        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';
        query = query.sort(sortBy);

        const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '-__v';
        query = query.select(fields);

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                return createMessage(404, 'This page does not exist');
            }
        }

        const totalProduct = await Product.count();
        const products = await query;

        return createMessage(200, 'Success', {
            data: products,
            total: totalProduct,
            pageCurrent: Number(req.query.page),
            totalPage: Math.ceil(totalProduct / limit),
        });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const addToWishlistService = async (id, productId) => {
    try {
        const product = Product.findById(productId);
        if (!product) {
            return createMessage(404, 'Product not found');
        }
        const user = await User.findById(id);
        const isProductInWishlist = user.wishlist.includes(productId);
        if (isProductInWishlist) {
            user.wishlist.pull(productId);
            await user.save();
        } else {
            user.wishlist.push(productId);
            await user.save();
        }
        return createMessage(200, 'Add to wishlist successfully', { data: user });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const rateProductService = async (id, data) => {
    const { productId, comment, star } = data;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return createMessage(404, 'Product not found');
        }

        const existRating = product.reviews.find((rating) => rating.postedBy.toString === id.toString());
        if (existRating) {
            existRating.star = star;
            existRating.comment = comment;
        } else {
            product.reviews.push({
                star,
                comment,
                postedBy: id,
            });
        }

        let totalReviews = 0;
        product.reviews.forEach((review) => (totalReviews += review.star));
        const averageRating = product.reviews.length > 0 ? Math.round(totalReviews / product.reviews.length) : 0;

        product.averageStar = averageRating;
        product.numOfReviews = product.reviews.length;
        const updateProduct = await product.save();
        return createMessage(200, 'Success', { data: updateProduct });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const uploadProductImagesService = async (productId, files) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return createMessage(404, 'Product not found');
        }

        const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = [];
        for (let file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        const newImages = urls.map((item) => ({ url: item.url, public_id: item.public_id }));
        newImages.map((image) => product.images.push(image));
        await product.save();
        return createMessage(200, 'Success', { data: product });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteProductImagesService = async (productId, publicIds) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return createMessage(404, 'Product not found');
        }
        await cloudinaryDeleteImg(publicIds, 'images');
        product.images = product.images.filter((image) => !publicIds.includes(image.public_id));
        await product.save();
        return createMessage(200, 'Deleted successfully');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

export {
    createProductService,
    updateProductService,
    getDetailProductService,
    deleteProductService,
    deleteManyProductService,
    getAllProductService,
    searchProductService,
    addToWishlistService,
    rateProductService,
    uploadProductImagesService,
    deleteProductImagesService,
};
