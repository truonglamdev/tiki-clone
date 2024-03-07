import { ALL_COLOR_FAILED, ALL_COLOR_REQUEST, ALL_COLOR_SUCCESS } from '~/constants/colorConstant';
import { getAllColorService } from '~/services/colorService';

const getAllColor = () => async (dispatch) => {
    dispatch({ type: ALL_COLOR_REQUEST });
    try {
        const res = await getAllColorService();
        dispatch({ type: ALL_COLOR_SUCCESS, payload: { message: res.message, data: res.data } });
    } catch (error) {
        dispatch({
            type: ALL_COLOR_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

export { getAllColor };
