import { ALL_CATEGORY_FAILED, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS } from '~/constants/categoryConstant';
import { getAllCategoryService } from '~/services/categoryService';

const getAllCategory = () => async (dispatch) => {
    dispatch({ type: ALL_CATEGORY_REQUEST });
    try {
        const res = await getAllCategoryService();
        dispatch({ type: ALL_CATEGORY_SUCCESS, payload: { message: res.message, data: res.data } });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

export { getAllCategory };
