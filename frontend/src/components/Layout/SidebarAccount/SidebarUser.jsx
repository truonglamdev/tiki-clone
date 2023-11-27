import classNames from 'classnames/bind';
import styles from './SidebarAccount.module.scss';
import ListSidebarItem from '../SideBar/ListSidebarItem';
import sidebarImage from '~/images/sidebarImages';

const cx = classNames.bind(styles);
function SidebarUser() {
    const data = [
        {
            image: sidebarImage.reward,
            title: 'Astra Reward',
            path: '/astra',
        },
        {
            image: sidebarImage.tikiExchange,
            title: 'Tiki Exchange',
            path: '/exchange',
        },
        {
            image: sidebarImage.clearance,
            title: 'Clearance sale',
            path: '/clearance',
        },
        {
            image: sidebarImage.voucher,
            title: 'Voucher',
            path: '/voucher',
        },
        {
            image: sidebarImage.digitalWallet,
            title: 'Card promotions',
            path: '/promotion',
        },
        {
            image: sidebarImage.payBill,
            title: 'Payment , to up',
            path: '/to-up',
        },
        {
            image: sidebarImage.payLater,
            title: 'Buy now, pay later',
            path: '/payLater',
        },
        {
            image: sidebarImage.voucher,
            title: 'Voucher',
            path: '/voucher',
        },
        {
            image: sidebarImage.digitalWallet,
            title: 'Card promotions',
            path: '/promotion',
        },
        {
            image: sidebarImage.payBill,
            title: 'Payment , to up',
            path: '/to-up',
        },
        {
            image: sidebarImage.payLater,
            title: 'Buy now, pay later',
            path: '/payLater',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <ListSidebarItem title="OutStanding" data={data} />
            <ListSidebarItem title="OutStanding" data={data} />
        </div>
    );
}

export default SidebarUser;
