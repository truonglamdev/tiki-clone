import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import logo from '~/images/logo.png';
import iconImages from '~/images/iconImages';
import styles from './Header.module.scss';
import Search from '../Search';

const cx = classNames.bind(styles);
export default function Header() {
    const categories = [
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
    ];
    return (
        <div className={cx('container-header')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src={logo} className={cx('logo-image')} alt="logo" />
                    </Link>
                </div>
                <div className={cx('search')}>
                    <Search />
                </div>
                <div className={cx('menu')}>
                    <ul className={cx('menu-list')}>
                        <li className={cx('menu-item')}>
                            <Link to="/">
                                <img src={iconImages.home} className={cx('icon')} alt="home" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/">
                                <img src={iconImages.astra} className={cx('icon')} alt="astra" />
                                <span>Astra</span>
                            </Link>
                        </li>
                        <li className={cx('menu-item')}>
                            <Link to="/account">
                                <img src={iconImages.account} className={cx('icon')} alt="account" />
                                <span>Account</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('cart')}>
                    <div className={cx('spacer')}></div>
                    <img src={iconImages.cart} className={cx('icon', 'cart-icon')} alt="cart" />
                    <div className={cx('quantity')}>0</div>
                </div>
            </div>
            <div className={cx('nav')}>
                <ul className={cx('nav-list')}>
                    {categories.map((category, index) => (
                        <li key={index} className={cx('nav-item')}>
                            <Link to={category.path}>{category.category}</Link>
                        </li>
                    ))}
                </ul>
                <div className={cx('location')}>
                    <img src={iconImages.location} className={cx('icon')} alt="location" /> Deliver to :{' '}
                    <span>Duy Chau Duy Xuyen Quang Nam</span>
                </div>
            </div>
        </div>
    );
}
