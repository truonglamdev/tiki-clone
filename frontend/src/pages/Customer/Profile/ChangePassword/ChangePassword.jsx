import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/InputField/InputField';
import { getToastError, getToastWarning } from '~/customs/toastMessage/toastMessage';
import { clearMessage, logoutUser, updatePassword } from '~/redux/actions/authAction';
import styles from './ChangePassword.module.scss';

const cx = classNames.bind(styles);
function ChangePassword({ isOpen = false, setIsOpenModal = () => {} }) {
    const { user, message, isLoading, isSuccess, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(6).max(32),
        newPassword: Yup.string().required('New password is required').min(6).max(32),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Confirm password must match'),
    });
    const customStylesModal = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '100',
            width: 'auto',
            backgroundColor: '#fff',
            padding: '0',
            borderRadius: '10px',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00000087',
        },
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const handleChangePassword = async ({ password, newPassword, confirmPassword }) => {
        const userId = user?._id;
        const data = { oldPassword: password, newPassword: newPassword, confirmNewPassword: confirmPassword };
        if (userId) {
            await dispatch(updatePassword(userId, data));
            if (isSuccess && !isAuthenticated) {
                dispatch(logoutUser());
                navigate('/');
            }
        } else {
            getToastWarning('User not found');
        }
    };

    useEffect(() => {
        if (!isSuccess && message) {
            getToastError(message);
            dispatch(clearMessage());
        }
    }, [dispatch, message, isSuccess]);

    return (
        <Modal isOpen={isOpen} style={customStylesModal} closeTimeoutMS={200}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2>Change password</h2>
                    <MdClose onClick={() => setIsOpenModal()} />
                </div>
                <form className={cx('content')} onSubmit={handleSubmit(handleChangePassword)}>
                    <InputField name="password" title="Password" register={register} errors={errors} />
                    <InputField name="newPassword" title="New Password" register={register} errors={errors} />
                    <InputField name="confirmPassword" title="Confirm Password" register={register} errors={errors} />
                    <Button isLoading={isLoading} disabled={isLoading} large className={cx('save-btn')} type="submit">
                        Save Change
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

ChangePassword.propTypes = {
    setIsOpenModal: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ChangePassword;
