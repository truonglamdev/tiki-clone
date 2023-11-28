import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function SidebarItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <NavLink
                to={data.path}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? '500' : '',
                        color: isPending ? 'red' : 'black',
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#ebebf0' : '',
                    };
                }}
            >
                {data?.image ? (
                    <img src={data.image} alt={data.title} className={cx('image')} />
                ) : (
                    <span className={cx('icon-left')}>{data.icon}</span>
                )}
                <span className={cx('title')}>{data.title}</span>
            </NavLink>
        </div>
    );
}

SidebarItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SidebarItem;
