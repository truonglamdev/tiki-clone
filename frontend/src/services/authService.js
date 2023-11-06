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

export { loginService, refreshTokenService };
