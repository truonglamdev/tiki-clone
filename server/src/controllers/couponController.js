import yup from 'yup';
import createErrorMessage from '../utils/errorMessage.js';
import {
    createCouponService,
    getAllCouponsService,
    getCouponService,
    updateCouponService,
    deleteCouponService,
} from '../services/couponService.js';
const createCoupon = async (req, res) => {
    const createCouponSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        expiry: yup.date().required('Expiry is required'),
        discount: yup.number().required('Discount is required'),
    });
    try {
        await createCouponSchema.validate(req.body, { abortEarly: false });
        const response = await createCouponService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        const response = createErrorMessage(error);
        return res.status(response.statusCode).json(response.message);
    }
};

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await updateCouponService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const response = await getAllCouponsService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getCouponService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteCouponService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createCoupon, updateCoupon, getAllCoupons, getCoupon, deleteCoupon };
