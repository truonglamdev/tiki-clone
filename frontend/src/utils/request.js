import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL_API;
const instance = axios.create({
    baseURL: baseURL,
});

export const get = async (path, params) => {
    try {
        const res = await instance.get(path, params);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const post = async (path, data) => {
    const res = await instance.post(path, data);
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
