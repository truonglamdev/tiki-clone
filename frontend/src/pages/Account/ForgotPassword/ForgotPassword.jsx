import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout/FormLayout';
import Loading from '~/components/Loading/Loading';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import { clearMessage, forgotPassword } from '~/redux/actions/authAction';
import styles from '../Account.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isSuccess, message } = useSelector((state) => state.user);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
    });
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitForm = async ({ email }) => {
        setEmail(email);
        dispatch(forgotPassword({ email }));
    };

    const handleCloseForm = () => {
        navigate('/');
        // dispatch()
    };

    useEffect(() => {
        if (!isSuccess && message) {
            getToastError(message);
        }
        dispatch(clearMessage());
    }, [isSuccess, message, dispatch]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <FormLayout title="Forgot password ?">
                    {!isSuccess ? (
                        <div>
                            <div className={cx('form-title')}>
                                Please enter your account information to retrieve your password
                            </div>
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <InputField name="email" title="Email" register={register} errors={errors} />
                                <Button primary type="submit" className={cx('btn-submit')}>
                                    Password retrieval
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className={cx('form-success')}>
                            <span className={cx('check-icon')}>
                                <FaRegCheckCircle />
                            </span>
                            <span
                                className={cx('success-message')}
                            >{`The password reset link has just been sent to your email: ${email} please  check your email`}</span>
                            <Button outline type="submit" className={cx('btn-submit')} onClick={handleCloseForm}>
                                Close
                            </Button>
                        </div>
                    )}
                </FormLayout>
            )}
        </>
    );
}

export default ForgotPassword;
