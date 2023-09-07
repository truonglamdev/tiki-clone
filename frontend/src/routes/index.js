import Login from '~/pages/Account/Login';
import Register from '~/pages/Account/Register';
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
        path: '/login',
        page: Login,
        isShowHeader: false,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: false,
    },
    {
        path: '*',
        page: NotFound,
        isShowHeader: false,
    },
];
