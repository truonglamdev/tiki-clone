import classNames from 'classnames/bind';
import { BsMenuDown } from 'react-icons/bs';
import { IoBagCheckOutline, IoNewspaperOutline } from 'react-icons/io5';
import { LiaProductHunt } from 'react-icons/lia';
import { LuUsers } from 'react-icons/lu';
import { MdOutlineBrandingWatermark, MdOutlineColorLens, MdOutlineDashboard } from 'react-icons/md';
import { RiCoupon2Line } from 'react-icons/ri';
import ListSidebarItem from '../ListSidebarItem';
import styles from './SidebarAccount.module.scss';
const cx = classNames.bind(styles);
function SidebarAdmin() {
    const data = [
        {
            title: 'Dashboard',
            path: '/admin/dashboard',
            icon: <MdOutlineDashboard />,
        },
        {
            title: 'Customers',
            path: '/admin/customers',
            icon: <LuUsers />,
        },
        {
            title: 'Orders',
            path: '/admin/orders',
            icon: <IoBagCheckOutline />,
        },
        {
            title: 'Categories',
            path: '/admin/category',
            icon: <BsMenuDown />,
        },
        {
            title: 'Products',
            path: '/admin/products',
            icon: <LiaProductHunt />,
        },
        {
            title: 'Brands',
            path: '/admin/brand',
            icon: <MdOutlineBrandingWatermark />,
        },
        {
            title: 'Colors',
            path: '/admin/color',
            icon: <MdOutlineColorLens />,
        },
        {
            title: 'Vouchers',
            path: '/admin/coupon',
            icon: <RiCoupon2Line />,
        },
        {
            title: 'Blogs',
            path: '/admin/blog',
            icon: <IoNewspaperOutline />,
        },
    ];

    return (
        <div className={cx('wrapper')} > 
            <ListSidebarItem title="Admin system" data={data}  />
        </div>
    );
}

export default SidebarAdmin;
