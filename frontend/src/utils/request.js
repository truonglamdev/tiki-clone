import axios from 'axios';
import Cookies from 'universal-cookie';
import { refreshTokenService } from '~/services/authService';

const cookies = new Cookies();

const baseURL = import.meta.env.VITE_BASE_URL_API;
export const instance = axios.create({
    baseURL: baseURL,
});

instance.interceptors.request.use(
    function (config) {
        const accessToken = cookies.get('accessToken');
        const refreshToken = cookies.get('refreshToken');

        if (accessToken && refreshToken) {
            config.headers = {
                Authorization: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
                Accept: 'application/json',
            };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const config = error?.config;
        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const token = await refreshTokenService();
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            return instance(config);
        }
        return Promise.reject(error);
    },
);

export const get = async (path, params) => {
    try {
        const res = await instance.get(path, params);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const post = async (path, data, config = {}) => {
    const res = await instance.post(path, data, { ...config });
    return res.data;
};

export const put = async (path, data) => {
    const res = await instance.put(path, data);
    return res.data;
};

export const remove = async (path, data) => {
    const res = await instance.delete(path, { data });
    return res.data;
};
