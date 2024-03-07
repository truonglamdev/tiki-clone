import Brand from '../models/brandModel.js';
import createMessage from '../utils/createMessage.js';

const createBrandService = async (newBrand) => {
    try {
        const isExistBrand = await Brand.findOne(newBrand);
        if (isExistBrand) {
            return createMessage(200, 'Brand already exist ', { data: isExistBrand });
        }
        const createBrand = await Brand.create(newBrand);
        return createMessage(200, 'Success', { data: createBrand });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getBrandService = async (id) => {
    try {
        const brand = await Brand.findById(id);
        if (!brand) {
            return createMessage(404, 'Brand not found');
        }
        return createMessage(200, 'Success', { data: brand });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllBrandsService = async () => {
    try {
        const allBrands = await Brand.find();
        return createMessage(200, 'Success', { data: allBrands });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateBrandService = async (id, title) => {
    try {
        const colorUpdate = await Brand.findByIdAndUpdate(id, title, { new: true });
        if (!colorUpdate) {
            createMessage(400, 'Update brand failed');
        }
        return createMessage(200, 'Success', { data: colorUpdate });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteBrandService = async (id) => {
    try {
        await Brand.findByIdAndDelete(id);
        return createMessage(200, 'Delete success ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export { createBrandService, getBrandService, getAllBrandsService, updateBrandService, deleteBrandService };
