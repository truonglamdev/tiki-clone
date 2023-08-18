import ProductItem from './ProductItem/ProductItem';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Products() {
    return (
        <div className={cx('wrapper')}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </div>
    );
}

export default Products;
