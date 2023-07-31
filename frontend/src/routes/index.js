import Home from '../pages/Home';
import Order from '../pages/Order';

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
];
