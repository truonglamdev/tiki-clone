import Login from '~/pages/Account/Login';
import Register from '~/pages/Account/Register';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Order from '~/pages/Order';
import ProductDetail from '~/pages/ProductDetail';
import ForgotPassword from '~/pages/Account/ForgotPassword';
import ResetPassword from '~/pages/Account/ResetPassword';

export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/order',
        page: Order,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/product-detail',
        page: ProductDetail,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '/forgot-password',
        page: ForgotPassword,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '/password/reset/:id',
        page: ResetPassword,
        isShowHeader: false,
        isPrivate: false,
    },
    {
        path: '*',
        page: NotFound,
        isShowHeader: false,
        isPrivate: false,
    },
];
