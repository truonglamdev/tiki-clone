import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconImages from '~/images/iconImages';
import styles from './SuggestItem.module.scss';
const cx = classNames.bind(styles);

function SuggestItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={`/search?q=${data.name}`}>
            <img src={iconImages.search} className={cx('search-icon')} />
            <span className={cx('title')}>{data.name}</span>
        </Link>
    );
}

SuggestItem.propTypes = {
    data: PropTypes.object,
};

export default SuggestItem;
