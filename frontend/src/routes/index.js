import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Order from '~/pages/Order';
import ProductDetail from '~/pages/ProductDetail';

export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: Order,
        isShowHeader: true,
    },
    {
        path: '/product-detail',
        page: ProductDetail,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFound,
        isShowHeader: false,
    },
];
