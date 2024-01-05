import AccountLayout from '~/components/Layout/AccountLayout';
import classNames from 'classnames/bind';
import styles from './Customers.module.scss';

const cx = classNames.bind(styles);

export default function Customers() {
    return (
        <AccountLayout isAdmin>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>Customers</div>
                <div className={cx('container')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('search')}></div>
                        <div className={cx('export')}></div>
                        <div className={cx('sort')}></div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
