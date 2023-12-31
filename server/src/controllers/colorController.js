import {
    createColorService,
    getColorService,
    getAllColorsService,
    updateColorService,
    deleteColorService,
} from '../services/colorService.js';
import validateMongoDbId from '../utils/validateMongoDbId.js';

const createColor = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ message: 'Color is required' });
        }
        const response = await createColorService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getColor = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getColorService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllColors = async (req, res) => {
    try {
        const response = await getAllColorsService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateColor = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        validateMongoDbId(id);
        if (!title) {
            return res.status(404).json({ message: 'Color title is required' });
        }
        const response = await updateColorService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await deleteColorService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createColor, getColor, getAllColors, updateColor, deleteColor };
