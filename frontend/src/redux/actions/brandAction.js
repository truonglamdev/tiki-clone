import { ALL_BRAND_FAILED, ALL_BRAND_REQUEST, ALL_BRAND_SUCCESS } from '~/constants/brandConstant';
import { getAllBrandService } from '~/services/brandService';

const getAllBrand = () => async (dispatch) => {
    dispatch({ type: ALL_BRAND_REQUEST });
    try {
        const res = await getAllBrandService();
        dispatch({ type: ALL_BRAND_SUCCESS, payload: { message: res.message, data: res.data } });
    } catch (error) {
        dispatch({
            type: ALL_BRAND_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

export { getAllBrand };
