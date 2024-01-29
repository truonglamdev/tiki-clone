import Cookies from 'universal-cookie';
import {
    CLEAR_MESSAGE,
    DELETE_AVATAR_FAILED,
    DELETE_AVATAR_REQUEST,
    DELETE_AVATAR_SUCCESS,
    DETAIL_USER_FAILED,
    DETAIL_USER_REQUEST,
    DETAIL_USER_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    UPDATE_AVATAR_FAILED,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_PASSWORD_FAILED,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
} from '~/constants/authConstant';
import {
    forgotPasswordService,
    getDetailsUserService,
    loginService,
    logoutService,
    registerUserService,
    resetPasswordService,
    updateUserInfoService,
    updateAvatarService,
    deleteAvatarService,
    updatePasswordService,
} from '~/services/authService';
const cookies = new Cookies();
const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await loginService(data);
        if (res) {
            localStorage.removeItem('user');
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
            localStorage.setItem('user', JSON.stringify(res.user));
            cookies.set('accessToken', res?.accessToken);
            cookies.set('refreshToken', res?.refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: res.user,
                    message: res.message,
                },
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
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
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: {
                message: res.message,
            },
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const registerUser = (data) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await registerUserService(data);
        localStorage.setItem('user', JSON.stringify(res.user));
        dispatch({ type: REGISTER_SUCCESS, payload: { user: res.user, message: res.message } });
    } catch (error) {
        dispatch({
            type: REGISTER_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const forgotPassword = (data) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const res = await forgotPasswordService(data);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: { message: res.message } });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const resetPassword = (token, data) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const res = await resetPasswordService(token, data);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: { message: res.message } });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const updateUser = (userId, data) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const res = await updateUserInfoService(userId, data);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: { message: res.message, user: res.user } });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const updateAvatar = (userId, data) => async (dispatch) => {
    dispatch({ type: UPDATE_AVATAR_REQUEST });
    try {
        const res = await updateAvatarService(userId, data);
        dispatch({ type: UPDATE_AVATAR_SUCCESS, payload: { message: res.message, user: res.data } });
    } catch (error) {
        dispatch({
            type: UPDATE_AVATAR_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const deleteAvatar = (userId, data) => async (dispatch) => {
    dispatch({ type: DELETE_AVATAR_REQUEST });
    try {
        const res = await deleteAvatarService(userId, data);
        dispatch({ type: DELETE_AVATAR_SUCCESS, payload: { message: res.message } });
    } catch (error) {
        dispatch({
            type: DELETE_AVATAR_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const getDetailsUser = (userId) => async (dispatch) => {
    dispatch({ type: DETAIL_USER_REQUEST });
    try {
        const res = await getDetailsUserService(userId);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.user));
        dispatch({ type: DETAIL_USER_SUCCESS, payload: { message: res.message, user: res.user } });
    } catch (error) {
        dispatch({
            type: DETAIL_USER_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};

const updatePassword = (userId, data) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    try {
        const res = await updatePasswordService(userId, data);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: { message: res.message } });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAILED,
            payload: {
                message: error.response?.data?.message,
            },
        });
    }
};



const clearMessage = () => (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};
export {
    loginUser,
    registerUser,
    resetUser,
    clearMessage,
    logoutUser,
    forgotPassword,
    resetPassword,
    updateUser,
    getDetailsUser,
    updateAvatar,
    deleteAvatar,
    updatePassword,
};
