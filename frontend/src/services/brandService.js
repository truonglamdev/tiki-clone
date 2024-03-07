import * as request from '~/utils/request';
const getAllBrandService = async () => {
    return await request.get('/brands');
};

export { getAllBrandService };
