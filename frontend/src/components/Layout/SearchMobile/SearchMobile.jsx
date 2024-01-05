import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaRegSadCry } from 'react-icons/fa';
import { FcPrevious } from 'react-icons/fc';
import { FiShoppingCart } from 'react-icons/fi';
import Modal from 'react-modal';
import useDebounce from '~/components/Hooks/useDebounce';
import SearchProductItem from '~/components/SearchProductItem';
import SuggestItem from '~/components/SuggestItem';
import iconImages from '~/images/iconImages';
import * as request from '~/utils/request';
import SidebarMobile from '../SideBar/SidebarMobile';
import styles from './SearchMobile.module.scss';

const cx = classNames.bind(styles);
function SearchMobile({ isOpen, onClose }) {
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounceValue = useDebounce(searchValue);

    const customStylesModal = {
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

    useEffect(() => {
        (async () => {
            const res = await request.get(`search?q=${debounceValue}&limit=4`);
            if (res?.data) {
                setSearchResult(res.data);
            }
        })();
    }, [debounceValue]);
    return (
        <div className={cx('search-mobile')}>
            <Modal isOpen={isOpen} style={customStylesModal}>
                <SidebarMobile />
                <main id="page-wrap" className={cx('content-wrap')}>
                    <div className={cx('header-mobile')}>
                        <div className={cx('icon-prev')} onClick={onClose}>
                            <FcPrevious />
                        </div>
                        <div className={cx('icon-bars')}>
                            <FaBars />
                        </div>
                        <div className={cx('search-mobile')}>
                            <img src={iconImages.search} className={cx('search-icon')} />
                            <input
                                ref={inputRef}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Everyday low prices, no need to hunt for sales"
                            />
                        </div>
                        <div className={cx('icon-cart')}>
                            <FiShoppingCart />
                            <div className={cx('quantity')}>0</div>
                        </div>
                    </div>
                    <div>
                        {searchResult.length > 0 ? (
                            <>
                                <div className={cx('history-result')}>
                                    {searchResult.map((item) => (
                                        <SuggestItem key={item._id} data={item} />
                                    ))}
                                </div>
                                <div className={cx('product-search')}>
                                    {searchResult.map((item) => (
                                        <SearchProductItem key={item._id} data={item} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className={cx('no-result')}>
                                No result !! <FaRegSadCry />
                            </div>
                        )}
                    </div>
                </main>
            </Modal>
        </div>
    );
}

SearchMobile.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

export default SearchMobile;
