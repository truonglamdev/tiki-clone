import * as request from '~/utils/request';
const getAllCategoryService = async () => {
    return await request.get('/categories');
};

export { getAllCategoryService };
