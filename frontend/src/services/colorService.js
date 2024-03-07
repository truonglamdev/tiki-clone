import * as request from '~/utils/request';
const getAllColorService = async () => {
    return await request.get('/colors');
};

export { getAllColorService };
