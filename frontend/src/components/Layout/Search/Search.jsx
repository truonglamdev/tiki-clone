import Tippy from '@tippyjs/react/headless';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import iconImages from '~/images/iconImages';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Search() {
    const [isShowResults, setIsShowResults] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <Tippy
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <WrapperPopper> My tippy box</WrapperPopper>
                    </div>
                )}
                interactive
                visible={isShowResults}
            >
                <div className={cx('search')}>
                    <img src={iconImages.search} className={cx('search-icon')} />
                    <input
                        className={cx('search-input')}
                        placeholder="Everyday low prices, no need to hunt for sales"
                        onClick={() => setIsShowResults(true)}
                        onBlur={() => setIsShowResults(false)}
                    />
                    <button className={cx('search-btn')}>Search</button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
