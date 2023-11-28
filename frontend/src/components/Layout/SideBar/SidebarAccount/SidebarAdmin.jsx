import classNames from 'classnames/bind';
import styles from './SidebarAccount.module.scss';
import ListSidebarItem from '../ListSidebarItem';
import sidebarImage from '~/images/sidebarImages';
import { FaUser } from 'react-icons/fa';

const cx = classNames.bind(styles);
function SidebarAdmin() {
    const data = [
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
        {
            image: sidebarImage.payBill,
            title: 'Payment , to up',
            path: '/to-up',
            icon: '',
        },
        {
            image: sidebarImage.payLater,
            title: 'Buy now, pay later',
            path: '/payLater',
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
        {
            image: sidebarImage.payBill,
            title: 'Payment , to up',
            path: '/to-up',
            icon: '',
        },
        {
            image: sidebarImage.payLater,
            title: 'Buy now, pay later',
            path: '/payLater',
            icon: '',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <ListSidebarItem title="OutStanding" data={data} />
            <ListSidebarItem title="OutStanding" data={data} />
        </div>
    );
}

export default SidebarAdmin;
