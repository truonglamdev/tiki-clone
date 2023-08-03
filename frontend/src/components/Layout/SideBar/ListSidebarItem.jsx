import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarItem from '~/components/SidebarItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export default function ListSidebarItem({ title, data }) {
    return (
        <div className={cx('sidebar-item')}>
            <h4>{title}</h4>
            <div className={cx('menu-list')}>
                {data.map((item, index) => (
                    <SidebarItem key={index} data={item} />
                ))}
            </div>
        </div>
    );
}

ListSidebarItem.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
};
