import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FormLayout.module.scss';
import Image from '~/components/Image';
import loginLogo from '~/images/loginLogo.png';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function FormLayout({ children, title }) {
    const navigate = useNavigate();
    const onBackClick = () => {
        navigate('/');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <div className={cx('content-left')}>
                    <div className={cx('button')} onClick={onBackClick}>
                        <span className={cx('close-btn')} onClick={onBackClick}>
                            <IoIosCloseCircleOutline />
                        </span>
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
