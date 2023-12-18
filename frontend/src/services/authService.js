import * as request from '~/utils/request';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const loginService = async (data) => {
    const res = await request.post('auth/login', data);
    return res;
};

const refreshTokenService = async () => {
    const res = await request.post('refresh-token');
    if (res?.accessToken) {
        cookies.remove('accessToken');
        cookies.set('accessToken', res.accessToken);
    }
    return res?.accessToken;
};

const logoutService = async () => {
    const res = await request.post('auth/logout');
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    localStorage.removeItem('user');
    return res;
};

const registerUserService = async (data) => {
    const res = await request.post('auth/register', data);
    return res;
};

const forgotPasswordService = async (data) => {
    const res = await request.post('password/forgot', data);
    return res;
};

const resetPasswordService = async (token, data) => {
    const res = await request.put(`password/reset/${token}`, data);
    return res;
};

const updatePasswordService = async (userId, data) => {
    const res = await request.put(`password/update/${userId}`, data);
    return res;
};

const updateUserInfoService = async (userId, data) => {
    const res = await request.put(`user/${userId}`, data);
    return res;
};

const updateAvatarService = async (userId, data) => {
    const res = await request.post(`user/upload-img/${userId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
};

const deleteAvatarService = async (userId, data) => {
    const res = await request.remove(`user/delete-img/${userId}`, data);
    return res;
};

const getDetailsUserService = async (userId) => {
    const res = await request.get(`user/${userId}`);
    return res;
};

export {
    loginService,
    refreshTokenService,
    logoutService,
    registerUserService,
    forgotPasswordService,
    resetPasswordService,
    updateUserInfoService,
    getDetailsUserService,
    updateAvatarService,
    deleteAvatarService,
    updatePasswordService,
};
