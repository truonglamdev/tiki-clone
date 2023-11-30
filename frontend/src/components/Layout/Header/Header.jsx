import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FcPrevious } from 'react-icons/fc';
import { FiShoppingCart } from 'react-icons/fi';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DropdownItem from '~/components/DropdownItem';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import SearchProductItem from '~/components/SearchProductItem';
import SuggestItem from '~/components/SuggestItem';
import { getToastSuccess } from '~/customs/toastMessage/toastMessage';
import iconImages from '~/images/iconImages';
import logo from '~/images/logo.png';
import { clearMessage, logoutUser } from '~/redux/actions/authAction';
import Search from '../Search';
import styles from './Header.module.scss';
import SidebarMobile from '~/components/Layout/SideBar/SidebarMobile';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);
export default function Header() {
    const inputRef = useRef();
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, message, isSuccess, isLoading } = useSelector((state) => state.auth);

    const categories = [
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
        { category: 'trái cây', path: '/' },
    ];
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '100',
            width: '100%',
            height: '100vh',
            backgroundColor: '#fff',
            padding: '0',
        },
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsShowMenu(false);
    };

    const handleClickAccountBtn = () => {
        if (!user) {
            navigate('/login');
        } else {
            setIsShowMenu(true);
        }
    };

    const handleShowModal = () => {
        setIsOpenModal(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 300);
    };

    useEffect(() => {
        if (isSuccess && message) {
            getToastSuccess(message);
            dispatch(clearMessage());
            navigate('/');
        }
    }, [isSuccess, dispatch, message, user, navigate]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('container-header')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img src={logo} className={cx('logo-image')} alt="logo" />
                            </Link>
                        </div>
                        <div className={cx('search')}>
                            <Search onShowModal={handleShowModal} />
                        </div>
                        <div className={cx('menu')}>
                            <ul className={cx('menu-list')}>
                                <NavLink
                                    to="/"
                                    style={({ isActive, isPending }) => {
                                        return {
                                            color: isPending ? 'red' : '#0a68ff',
                                            backgroundColor: isActive ? 'rgb(0 96 255 / 12%)' : '#fff',
                                        };
                                    }}
                                    className={cx('menu-item')}
                                >
                                    <img src={iconImages.home} className={cx('icon')} alt="home" />
                                    <span>Home</span>
                                </NavLink>
                                <Tippy
                                    render={(attrs) => (
                                        <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                                            <WrapperPopper>
                                                <DropdownItem onClick={() => navigate('/customer/profile')}>
                                                    My Account
                                                </DropdownItem>
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
                                    <div className={cx('menu-item')} onClick={handleClickAccountBtn}>
                                        <a>
                                            <img src={iconImages.account} className={cx('icon')} alt="account" />
                                            <span>Account</span>
                                        </a>
                                    </div>
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
                            <span>{user && user.address ? user.address : 'Not yet updated'}</span>
                        </div>
                    </div>
                    <div className={cx('modal-wrapper')}>
                        <Modal isOpen={isOpenModal} style={customStyles}>
                            <SidebarMobile />
                            <main id="page-wrap" className={cx('content-wrap')}>
                                <div className={cx('header-mobile')}>
                                    <div className={cx('icon-prev')} onClick={() => setIsOpenModal(false)}>
                                        <FcPrevious />
                                    </div>
                                    <div className={cx('icon-bars')}>
                                        <FaBars />
                                    </div>
                                    <div className={cx('search-mobile')}>
                                        <img src={iconImages.search} className={cx('search-icon')} />
                                        <input
                                            ref={inputRef}
                                            placeholder="Everyday low prices, no need to hunt for sales"
                                        />
                                    </div>
                                    <div className={cx('icon-cart')}>
                                        <FiShoppingCart />
                                        <div className={cx('quantity')}>0</div>
                                    </div>
                                </div>
                                <div className={cx('history-result')}>
                                    {/* <SuggestItem />
                                    <SuggestItem />
                                    <SuggestItem />
                                    <SuggestItem /> */}
                                </div>
                                <div className={cx('product-search')}>
                                    {/* <SearchProductItem />
                                    <SearchProductItem />
                                    <SearchProductItem />
                                    <SearchProductItem />
                                    <SearchProductItem />
                                    <SearchProductItem /> */}
                                </div>
                            </main>
                        </Modal>
                    </div>
                </div>
            )}
        </>
    );
}
