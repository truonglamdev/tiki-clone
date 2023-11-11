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
    if (res) {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        localStorage.removeItem('user');
    }
    return res;
};

const registerUserService = async (data) => {
    const res = await request.post('auth/register', data);
    return res;
};

export { loginService, refreshTokenService, logoutService, registerUserService };
