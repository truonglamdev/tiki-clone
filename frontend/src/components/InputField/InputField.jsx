/* eslint-disable react/prop-types */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './InputField.module.scss';
const cx = classNames.bind(styles);
function InputField({ name, title = '', register, errors }) {
    const [type, setType] = useState('text');
    useEffect(() => {
        if (name === 'password') {
            setType('password');
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-group', errors[name]?.message ? 'invalid' : '')}>
                <input type={type} {...register(name)} placeholder={title} className={cx('input-field')} />
                {name === 'password' && (
                    <div
                        className={cx('ege-icon')}
                        onClick={() => {
                            type === 'password' ? setType('text') : setType('password');
                        }}
                    >
                        {type === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                )}
            </div>
            <div className={cx('feedback-invalid')}>{errors[name]?.message}</div>
        </div>
    );
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    register: PropTypes.func.isRequired,
    error: PropTypes.object,
};

export default InputField;
