import Login from '~/pages/Account/Login';
import Register from '~/pages/Account/Register';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Order from '~/pages/Order';
import ProductDetail from '~/pages/ProductDetail';
import ForgotPassword from '~/pages/Account/ForgotPassword';
import ResetPassword from '~/pages/Account/ResetPassword';
import Profile from '~/pages/Customer/Profile';
import SearchResult from '~/pages/SearchResult';
import Dashboard from '~/pages/Admin/Dashboard';
import Customers from '~/pages/Admin/Customers';
import Products from '~/pages/Admin/Products';
import DetailsProducts from '~/pages/Admin/Products/DetailsProducts';

export const routes = [
    {
        path: '/admin/dashboard',
        page: Dashboard,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/admin/customers',
        page: Customers,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/admin/products',
        page: Products,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/admin/products/details',
        page: DetailsProducts,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
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
        path: '/customer/profile',
        page: Profile,
        isShowHeader: true,
        isPrivate: true,
    },
    {
        path: '/search/',
        page: SearchResult,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '*',
        page: NotFound,
        isShowHeader: true,
        isPrivate: false,
    },
];

export default routes;
