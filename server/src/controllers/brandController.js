import {
    createBrandService,
    deleteBrandService,
    getAllBrandsService,
    getBrandService,
    updateBrandService,
} from '../services/brandService.js';
import validateMongoDbId from '../utils/validateMongoDbId.js';

const createBrand = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ message: 'Brand is required' });
        }
        const response = await createBrandService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getBrand = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getBrandService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllBrands = async (req, res) => {
    try {
        const response = await getAllBrandsService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        validateMongoDbId(id);
        if (!title) {
            return res.status(404).json({ message: 'Brand title is required' });
        }
        const response = await updateBrandService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await deleteBrandService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand };
