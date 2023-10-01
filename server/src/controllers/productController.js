import {
    createProductService,
    updateProductService,
    getDetailProductService,
    deleteProductService,
    deleteManyProductService,
    searchProductService,
    getAllProductService,
    addToWishlistService,
    rateProductService,
} from '../services/productService.js';
import yup from 'yup';
const createProduct = async (req, res) => {
    try {
        const createProductSchema = yup.object().shape({
            name: yup.string().required('Name product is required'),
            images: yup.string().required('Images product is required'),
            category: yup.string().required('Category product is required'),
            description: yup.string().required('Description product is required'),
            countInStock: yup.number().required('Count in stock product is required'),
            price: yup.number().required('Price product is required'),
            rating: yup.number().required('Rating product is required'),
            discount: yup.number().required('Discount product is required'),
            brand: yup.string().required('Brand product is required'),
        });
        console.log(req.body);
        await createProductSchema.validate(req.body, { abortEarly: false });
        const response = await createProductService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Yup validation errors
            const yupErrors = error.errors;
            return res.status(400).json({
                errors: yupErrors,
            });
        } else {
            console.error('Error in createProduct:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(404).json({ status: 'ERR', message: 'Product ID is required' });
        }

        const response = await updateProductService(productId, data);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in updateProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const response = await getDetailProductService(productId);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in getDetailProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const response = await deleteProductService(productId);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const deleteManyProduct = async (req, res) => {
    try {
        const productIdList = req.body.ids;
        if (!productIdList || productIdList.length === 0) {
            return res.status(400).json({ status: 'ERR', message: 'List of IDs is required and cannot be empty' });
        }
        const response = await deleteManyProductService(productIdList);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in deleteManyProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const response = await getAllProductService(req);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in getAllProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const keyword = req.query.q;
        const response = await searchProductService(keyword);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error in searchProduct:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const addToWishlist = async (req, res) => {
    const { id } = req.user;
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).json({ status: 'ERR', message: 'Product id is required' });
    }
    try {
        const response = await addToWishlistService(id, productId);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

const rateProduct = async (req, res) => {
    const { id } = req.user;
    const { productId } = req.body;
    try {
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: `ProductId is required `,
            });
        }
        const response = await rateProductService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error',
        });
    }
};

export {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    deleteManyProduct,
    getAllProduct,
    searchProduct,
    addToWishlist,
    rateProduct,
};
