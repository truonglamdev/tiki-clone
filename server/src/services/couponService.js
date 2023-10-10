import Coupon from '../models/couponModel.js';
import createMessage from '../utils/createMessage.js';

const createCouponService = async (newCoupon) => {
    try {
        const createCoupon = await Coupon.create(newCoupon);
        return createMessage(200, 'Success', { data: createCoupon });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateCouponService = async (id, updatedCoupon) => {
    try {
        const exitsCoupon = await Coupon.findById(id);
        if (!exitsCoupon) {
            return createMessage(404, 'Coupon not found');
        }
        const updateCoupon = await Coupon.findByIdAndUpdate(id, updatedCoupon, { new: true });
        return createMessage(200, 'Success', { data: updateCoupon });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllCouponsService = async () => {
    try {
        const allCoupons = await Coupon.find();
        return createMessage(200, 'Success', { data: allCoupons });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getCouponService = async (id) => {
    try {
        const coupon = await Coupon.findById(id);
        return createMessage(200, 'Success', { data: coupon });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const deleteCouponService = async (id) => {
    try {
        await Coupon.findByIdAndDelete(id);
        return createMessage(200, 'Delete success ');
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export { createCouponService, updateCouponService, getAllCouponsService, getCouponService, deleteCouponService };
