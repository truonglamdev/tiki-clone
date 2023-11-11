import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropdownItem from '~/components/DropdownItem/DropdownItem';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import { getToastSuccess } from '~/customs/toastMessage/toastMessage';
import iconImages from '~/images/iconImages';
import logo from '~/images/logo.png';
import { logoutUser, clearError } from '~/redux/actions/authAction';
import Search from '../Search';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
export default function Header() {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [addressUser, setAddressUser] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, message } = useSelector((state) => state.user);

    const categories = [
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
    ];

    const handleLogout = () => {
        if (isAuthenticated) {
            dispatch(logoutUser());
            getToastSuccess(message);
            dispatch(clearError());
        }
    };

    const handleClickAccount = () => {
        if (isAuthenticated) {
            setIsShowMenu(true);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (user && user?.address) {
            setAddressUser(user.address);
        }
    }, [user]);

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
                        <Tippy
                            render={(attrs) => (
                                <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                                    <WrapperPopper>
                                        <DropdownItem>My Account</DropdownItem>
                                        <DropdownItem>My Order</DropdownItem>
                                        <DropdownItem>Support Center</DropdownItem>
                                        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                    </WrapperPopper>
                                </div>
                            )}
                            interactive
                            visible={isShowMenu}
                            onClickOutside={() => setIsShowMenu(false)}
                        >
                            <li className={cx('menu-item')} onClick={handleClickAccount}>
                                <a>
                                    <img src={iconImages.account} className={cx('icon')} alt="account" />
                                    <span>Account</span>
                                </a>
                            </li>
                        </Tippy>
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
                    <span>{addressUser ? addressUser : 'Not yet updated'}</span>
                </div>
            </div>
        </div>
    );
}
