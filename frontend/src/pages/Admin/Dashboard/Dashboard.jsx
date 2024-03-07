import AccountLayout from '~/components/Layout/AccountLayout';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Dashboard() {
    return (
        <AccountLayout isAdmin={true}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>Dashboard</div>
                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        <div className={cx('total-cart')}>
                            <Link to="/admin/customers" className={cx('cart')}>
                                <div className={cx('cart-left')}>
                                    <FiUsers />
                                </div>
                                <div className={cx('cart-right')}>
                                    <div className={cx('title')}>Total users</div>
                                    <div className={cx('quantity')}>73 users</div>
                                    <div>Total number of managed users</div>
                                </div>
                            </Link>
                            <Link to="/admin/products" className={cx('cart')}>
                                <div className={cx('cart-left')}>
                                    <FiUsers />
                                </div>
                                <div className={cx('cart-right')}>
                                    <div className={cx('title')}>Total products</div>
                                    <div className={cx('quantity')}>73 products</div>
                                    <div>Total number of managed products</div>
                                </div>
                            </Link>
                            <Link to="/admin/customer" className={cx('cart')}>
                                <div className={cx('cart-left')}>
                                    <FiUsers />
                                </div>
                                <div className={cx('cart-right')}>
                                    <div className={cx('title')}>Total users</div>
                                    <div className={cx('quantity')}>73 users</div>
                                    <div>Total number of managed users</div>
                                </div>
                            </Link>
                            <Link to="/admin/customer" className={cx('cart')}>
                                <div className={cx('cart-left')}>
                                    <FiUsers />
                                </div>
                                <div className={cx('cart-right')}>
                                    <div className={cx('title')}>Total users</div>
                                    <div className={cx('quantity')}>73 users</div>
                                    <div>Total number of managed users</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('content-right')}></div>
                </div>
            </div>
        </AccountLayout>
    );
}

export default Dashboard;
