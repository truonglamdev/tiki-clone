/* eslint-disable react/prop-types */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function Button({
    children,
    to,
    href,
    onClick,
    className,
    primary = false,
    disabled = false,
    leftIcon,
    rightIcon,
    small,
    large,
    medium,
    outline = false,
    isLoading = false,
    ...passProps
}) {
    let Comp = 'button';

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
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        disabled,
        small,
        outline,
        large,
        medium,
        isLoading,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {isLoading ? (
                <span className={cx('loading')}>
                    <span className={cx('loader')}></span>
                </span>
            ) : (
                <span className={cx('title')}>{children}</span>
            )}

            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
};

export default Button;
