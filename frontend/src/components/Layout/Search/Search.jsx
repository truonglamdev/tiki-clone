import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import SearchProductItem from '~/components/SearchProductItem';
import SuggestItem from '~/components/SuggestItem';
import iconImages from '~/images/iconImages';
import styles from './Search.module.scss';
import useDebounce from '~/components/Hooks/useDebounce';
import * as request from '~/utils/request';

const cx = classNames.bind(styles);
function Search({ onShowModal }) {
    const [isShowResults, setIsShowResults] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchValue, setSearchValue] = useState('');
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
        console.log('check submit');
    };
    useEffect(() => {
        console.log('check debounce: ', debounceValue);
        const fetchData = async () => {
            const res = await request.get(`search?q=${debounceValue}`);
            console.log(res.data);
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
                            <div className={cx('suggest')}>
                                <SuggestItem />
                                <SuggestItem />
                                <SuggestItem />
                                <SuggestItem />
                            </div>
                            <div className={cx('search-products')}>
                                <SearchProductItem />
                                <SearchProductItem />
                                <SearchProductItem />
                                <SearchProductItem />
                                <SearchProductItem />
                                <SearchProductItem />
                                <SearchProductItem />
                            </div>
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
