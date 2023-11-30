import classNames from 'classnames/bind';
import styles from './SearchProductItem.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../Image/Image';

const cx = classNames.bind(styles);
export default function SearchProductItem({ data }) {
    const imagePr = data?.images.length > 0 ? data.images[0].url : '';
    return (
        <Link className={cx('wrapper')} to={`/search?q=${data.name}`}>
            <Image src={imagePr} className={cx('product-img')} />
            <span className={cx('name')}>{data.name}</span>
        </Link>
    );
}

SearchProductItem.propTypes = {
    data: PropTypes.object,
};
