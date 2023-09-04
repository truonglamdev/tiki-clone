/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import styles from './ColorItem.module.scss';
import iconImages from '~/images/iconImages';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function ColorItem({ src, label, active, size }) {
    return (
        <div className={cx('wrapper', active === true ? 'active' : '', size === 'small' ? 'small' : '')}>
            <div className={cx('option-img', size === 'small' ? 'small' : '')}>
                <img
                    src="https://salt.tikicdn.com/cache/100x100/ts/product/0f/08/21/d46f8159e0ad5dff0192b9316e7d415f.png.webp"
                    alt=""
                />
            </div>
            <div className={cx('label', size === 'small' ? 'small' : '')}>Black</div>
            <div className={cx('indicator', active === true ? 'active' : '')}>
                <img src={iconImages.indicator} alt="indicator" />
            </div>
        </div>
    );
}

ColorItem.propTypes = {
    src: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    size: PropTypes.string,
};

export default ColorItem;
