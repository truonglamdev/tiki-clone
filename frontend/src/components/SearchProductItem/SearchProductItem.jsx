import classNames from 'classnames/bind';
import styles from './SearchProductItem.module.scss';

const cx = classNames.bind(styles);
export default function SearchProductItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://salt.tikicdn.com/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png"
                className={cx('product-img')}
            />
            <span className={cx('name')}>Iphone 15 pro max</span>
        </div>
    );
}
