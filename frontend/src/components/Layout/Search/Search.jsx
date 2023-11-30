import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useDebounce from '~/components/Hooks/useDebounce';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import SearchProductItem from '~/components/SearchProductItem';
import SuggestItem from '~/components/SuggestItem';
import iconImages from '~/images/iconImages';
import * as request from '~/utils/request';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search({ onShowModal }) {
    const navigate = useNavigate();
    const [isShowResults, setIsShowResults] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchValue, setSearchValue] = useState('');
    const [suggestResult, setSuggestResult] = useState([]);
    const debounceValue = useDebounce(searchValue);
    const handleClickSearchInput = () => {
        if (windowWidth <= 1023) {
            onShowModal();
        } else {
            setIsShowResults(true);
        }
    };

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${debounceValue}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await request.get(`search?q=${debounceValue}&limit=4`);
            if (res.data) {
                setSuggestResult(res.data);
            }
        };
        fetchData();
    }, [debounceValue]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Tippy
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <WrapperPopper>
                            {suggestResult.length > 0 ? (
                                <>
                                    <div className={cx('suggest')}>
                                        {suggestResult.map((item) => (
                                            <SuggestItem key={item._id} data={item} />
                                        ))}
                                    </div>
                                    <div className={cx('search-products')}>
                                        {suggestResult.map((item) => (
                                            <SearchProductItem key={item._id} data={item} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className={cx('no-result')}>
                                    No result !! <FaRegSadCry />
                                </div>
                            )}
                        </WrapperPopper>
                    </div>
                )}
                interactive
                visible={isShowResults}
                onClickOutside={() => setIsShowResults(false)}
            >
                <form className={cx('search')} onSubmit={handleSearchSubmit}>
                    <img src={iconImages.search} className={cx('search-icon')} />
                    <input
                        className={cx('search-input')}
                        placeholder="Everyday low prices, no need to hunt for sales"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onClick={handleClickSearchInput}
                        // onBlur={() => setIsShowResults(false)}
                    />
                    <button type="submit" className={cx('search-btn')}>
                        Search
                    </button>
                </form>
            </Tippy>
        </div>
    );
}

Search.propTypes = {
    onShowModal: PropTypes.func,
};

export default Search;
