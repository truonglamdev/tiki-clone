import classNames from 'classnames/bind';
import { useState } from 'react';
import { slide as MenuSidebar } from 'react-burger-menu';
import { FaCircleUser, FaListUl } from 'react-icons/fa6';
import { IoIosNotifications } from 'react-icons/io';
import { MdHome } from 'react-icons/md';
import DropdownItem from '~/components/DropdownItem';
import Image from '~/components/Image';
import styles from './SidebarMobile.module.scss';
import './CustomSidebar.scss';

const cx = classNames.bind(styles);
export default function SidebarMobile() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    // const closeMenu = () => {
    //     setIsOpenMenu(false);
    // };

    return (
        <MenuSidebar isOpen={isOpenMenu} onStateChange={(prev) => setIsOpenMenu(!prev)}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Image
                        src="https://salt.tikicdn.com/cache/280x280/ts/product/fe/ee/1f/346cf8e6bc20c4f3f70ae165d5cddb63.jpg"
                        className={cx('avatar')}
                    />
                    <span className={cx('name')}>Lam Truong</span>
                </div>
                <div className={cx('menu-list')}>
                    <DropdownItem
                        iconLeft={
                            <span className={cx('icon')}>
                                <MdHome />
                            </span>
                        }
                        href="/"
                    >
                        Home Page
                    </DropdownItem>
                    <DropdownItem
                        iconLeft={
                            <span className={cx('icon')}>
                                <FaListUl />
                            </span>
                        }
                    >
                        Bank List
                    </DropdownItem>
                    <DropdownItem
                        iconLeft={
                            <span className={cx('icon')}>
                                <FaCircleUser />
                            </span>
                        }
                        href="/customer/profile"
                    >
                        Account Management
                    </DropdownItem>
                    <DropdownItem
                        iconLeft={
                            <span className={cx('icon')}>
                                <IoIosNotifications />
                            </span>
                        }
                    >
                        Notification
                    </DropdownItem>
                </div>
            </div>
        </MenuSidebar>
    );
}
