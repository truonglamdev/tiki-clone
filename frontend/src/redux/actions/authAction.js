import Cookies from 'universal-cookie';
import {
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
} from '~/constants/authConstant';
import { loginService } from '~/services/authService';
const cookies = new Cookies();
const loginUser = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const res = await loginService(data);
        localStorage.setItem('user', JSON.stringify(res.user));
        cookies.set('accessToken', res?.accessToken);
        cookies.set('refreshToken', res?.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: res.user, message: res.message });
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
    }
};

const resetUser = () => async (dispatch) => {
    dispatch({ type: RESET_USER_REQUEST });
    localStorage.removeItem('user');
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    dispatch({ type: RESET_USER_SUCCESS });
};

export { loginUser, resetUser };
