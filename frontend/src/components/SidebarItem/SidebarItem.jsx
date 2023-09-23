import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function SidebarItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={data.path} className={cx('sidebar-item')}>
                <img src={data.image} alt={data.title} className={cx('image')} />
                <span className={cx('title')}>{data.title}</span>
            </Link>
        </div>
    );
}

SidebarItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SidebarItem;
