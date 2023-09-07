import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FormLayout.module.scss';
import Image from '~/components/Image';
import loginLogo from '~/images/loginLogo.png';
import iconImages from '~/images/iconImages';

const cx = classNames.bind(styles);
function FormLayout({ children, title }) {
    const onBackClick = () => {
        window.history.back();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <div className={cx('content-left')}>
                    <div className={cx('back-btn')} onClick={onBackClick}>
                        <Image src={iconImages.prev} alt="prevIcon" className={cx('back-icon')} />
                    </div>
                    <div className={cx('title')}>{title}</div>
                    {children}
                </div>
                <div className={cx('content-right')}>
                    <div>
                        <Image src={loginLogo} alt="logo" className={cx('logo')} />
                    </div>
                    <h3>Shopping at Tiki</h3>
                    <h4>Super deals every day</h4>
                </div>
            </div>
        </div>
    );
}
FormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default FormLayout;
