/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DropdownItem.module.scss';

const cx = classNames.bind(styles);
function DropdownItem({ children, ...props }) {
    return (
        <div {...props} className={cx('wrapper')}>
            {children}
        </div>
    );
}
DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DropdownItem;
