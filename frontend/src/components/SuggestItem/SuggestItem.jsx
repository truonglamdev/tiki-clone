import classNames from 'classnames/bind';
import styles from './SuggestItem.module.scss';
import iconImages from '~/images/iconImages';

const cx = classNames.bind(styles);
function SuggestItem() {
    return (
        <a
            className={cx('wrapper')}
            href="/search?q=t%E1%BA%BFt%20%E1%BB%9F%20l%C3%A0ng%20%C4%91%E1%BB%8Ba%20ng%E1%BB%A5c"
        >
            <img src={iconImages.search} className={cx('search-icon')} />
            <span className={cx('title')}>Iphone 13 promax</span>
        </a>
    );
}

export default SuggestItem;
