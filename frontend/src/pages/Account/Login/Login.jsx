import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import Loading from '~/components/Loading/Loading';
import ToastContainerCustom from '~/customs/toastMessage/ToastContainerCustom';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import { clearMessage, loginUser } from '~/redux/actions/authAction';
import styles from '../Account.module.scss';
const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, message, isLoading, user, isAuthenticated } = useSelector((state) => state.auth);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').min(6).max(32),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitLoginForm = async ({ email, password }) => {
        await dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (message && !isSuccess) {
            getToastError(message);
            dispatch(clearMessage());
        }
        if (isSuccess && isAuthenticated && user) {
            navigate('/');
            dispatch(clearMessage());
        }
    }, [isSuccess, message, dispatch, isAuthenticated, navigate, user]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <FormLayout title="Login with email">
                    <div className={cx('form-title')}>Enter your Tiki account email and password</div>
                    <form onSubmit={handleSubmit(onSubmitLoginForm)}>
                        <InputField name="email" title="Email" register={register} errors={errors} />
                        <InputField name="password" title="Password" register={register} errors={errors} />
                        <Button primary type="submit" className={cx('btn-submit')}>
                            Login
                        </Button>
                    </form>
                    <div className={cx('forgot-password')} onClick={() => navigate('/forgot-password')}>
                        Forgot Password ?
                    </div>
                    <div className={cx('create-account')} onClick={() => navigate('/register')}>
                        No account? <span>Create account</span>
                    </div>
                    <ToastContainerCustom />
                </FormLayout>
            )}
        </>
    );
}

export default Login;
