import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './AccountLayout.module.scss';
import SidebarUser from '../SideBar/SidebarAccount/SidebarUser';
import SidebarAdmin from '../SideBar/SidebarAccount/SidebarAdmin';

const cx = classNames.bind(styles);
function AccountLayout({ children, isAdmin = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home', 'container-header')}>
                <div className={cx('side-bar')}>{isAdmin ? <SidebarAdmin /> : <SidebarUser />}</div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

AccountLayout.propTypes = {
    children: PropTypes.node.isRequired,
    isAdmin: PropTypes.bool,
};

export default AccountLayout;
