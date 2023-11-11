import Cookies from 'universal-cookie';
import {
    CLEAR_ERROR,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
} from '~/constants/authConstant';
import { loginService, logoutService, registerUserService } from '~/services/authService';
const cookies = new Cookies();
const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await loginService(data);
        localStorage.setItem('user', JSON.stringify(res.user));
        cookies.set('accessToken', res?.accessToken);
        cookies.set('refreshToken', res?.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: res.user, message: res.message });
    } catch (error) {
        console.log('check error ', error);
        dispatch({ type: LOGIN_FAILED, message: error.response.data.message });
    }
};

const resetUser = () => async (dispatch) => {
    dispatch({ type: RESET_USER_REQUEST });
    localStorage.removeItem('user');
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    dispatch({ type: RESET_USER_SUCCESS });
};

const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
        const res = await logoutService();
        dispatch({ type: LOGOUT_SUCCESS, message: res.message });
    } catch (error) {
        dispatch({ type: LOGOUT_FAILED, message: error.response.data.message });
    }
};

const registerUser = (data) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await registerUserService(data);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data, message: res.message });
    } catch (error) {
        dispatch({ type: LOGOUT_FAILED, message: error.response.data.message });
    }
};

const clearError = () => (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export { loginUser, registerUser, resetUser, clearError, logoutUser };
