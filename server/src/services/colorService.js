import Color from '../models/colorModel.js';
import createMessage from '../utils/createMessage.js';

const createColorService = async (newColor) => {
    try {
        const isExistColor = await Color.findOne(newColor);
        if (isExistColor) {
            return createMessage(200, 'Colors already exist ', { data: isExistColor });
        }
        const createColor = await Color.create(newColor);
        return createMessage(200, 'Create color successfully', { data: createColor });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getColorService = async (id) => {
    try {
        const color = await Color.findById(id);
        if (!color) {
            return createMessage(404, 'Coupon not found');
        }
        return createMessage(200, 'Success', { data: color });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllColorsService = async () => {
    try {
        const allColors = await Color.find();
        return createMessage(200, 'Success', { data: allColors });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateColorService = async (id, title) => {
    try {
        const colorUpdate = await Color.findByIdAndUpdate(id, title, { new: true });
        if (!colorUpdate) {
            createMessage(400, 'Update color successfully');
        }
        return createMessage(200, 'Success', { data: colorUpdate });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteColorService = async (id) => {
    try {
        await Color.findByIdAndDelete(id);
        return createMessage(200, 'Delete color successfully ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export { createColorService, getColorService, getAllColorsService, updateColorService, deleteColorService };
