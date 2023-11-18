/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DropdownItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function DropdownItem({ children, iconLeft, iconRight, className, onClick, to, href, ...passProps }) {
    let Comp = 'div';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp
            {...props}
            className={cx('wrapper', {
                [className]: className,
            })}
        >
            {iconLeft && <span className={cx('icon')}>{iconLeft}</span>}
            <div className={cx('title')}> {children}</div>
            {iconRight && <span className={cx('icon')}>{iconRight}</span>}
        </Comp>
    );
}

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    iconLeft: PropTypes.node,
    iconRight: PropTypes.node,
    onClick: PropTypes.func,
    to: PropTypes.string,
    href: PropTypes.string,
};
export default DropdownItem;
