import classNames from 'classnames/bind';
import { FaEye, FaHeadphones, FaHeart, FaRegListAlt, FaUser } from 'react-icons/fa';
import { GiCardExchange } from 'react-icons/gi';
import { IoMdNotifications } from 'react-icons/io';
import { IoLocation } from 'react-icons/io5';
import { MdOutlinePayment, MdReviews, MdStarHalf } from 'react-icons/md';
import sidebarImage from '~/images/sidebarImages';
import ListSidebarItem from '../ListSidebarItem';
import styles from './SidebarAccount.module.scss';
import Image from '~/components/Image/Image';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function SidebarUser() {
    const user = useSelector((state) => state.auth.user);

    const ListItemCustomer = [
        {
            title: 'Account information',
            path: '/customer/profile',
            icon: <FaUser />,
        },
        {
            title: 'My notice',
            path: '/customer/notification',
            icon: <IoMdNotifications />,
        },
        {
            title: 'Order management',
            path: '/customer/order',
            icon: <FaRegListAlt />,
        },
        {
            title: 'Return management',
            path: '/customer/return',
            icon: <GiCardExchange />,
        },
        {
            title: 'Address management',
            path: '/customer/address',
            icon: <IoLocation />,
        },
        {
            title: 'Billing information',
            path: '/customer/payment',
            icon: <MdOutlinePayment />,
        },
        {
            title: 'Product reviews',
            path: '/customer/review',
            icon: <MdReviews />,
        },
        {
            title: 'Products you viewed',
            path: '/products',
            icon: <FaEye />,
        },
        {
            title: 'Favorite products',
            path: '/customer/wishlist',
            icon: <FaHeart />,
        },
        {
            title: 'My reviews',
            path: '/customer/review',
            icon: <MdStarHalf />,
        },
        {
            title: 'Customer support',
            path: '/customer/support',
            icon: <FaHeadphones />,
        },
    ];

    const ListItemExtension = [
        {
            image: sidebarImage.reward,
            title: 'Astra Reward',
            path: '/astra',
            icon: <FaUser />,
        },
        {
            image: sidebarImage.tikiExchange,
            title: 'Tiki Exchange',
            path: '/exchange',
            icon: '',
        },
        {
            image: sidebarImage.clearance,
            title: 'Clearance sale',
            path: '/clearance',
            icon: '',
        },
        {
            image: sidebarImage.voucher,
            title: 'Voucher',
            path: '/voucher',
            icon: '',
        },
        {
            image: sidebarImage.digitalWallet,
            title: 'Card promotions',
            path: '/promotion',
            icon: '',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-card')}>
                <Image src={user?.avatar} alt="avatar" className={cx('avatar')} />
                <div className={cx('name')}>
                    <span>Account of </span>
                    <p>{user.name}</p>
                </div>
            </div>
            <ListSidebarItem data={ListItemCustomer} />
            <ListSidebarItem data={ListItemExtension} />
        </div>
    );
}

export default SidebarUser;
