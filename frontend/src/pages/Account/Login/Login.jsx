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
import ToastContainerCustom from '~/customs/toastMessage/ToastContainerCustom';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import { clearMessage, loginUser } from '~/redux/actions/authAction';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, message } = useSelector((state) => {
        return state.user.state;
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').min(6).max(32),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitLoginForm = ({ email, password }) => {
        dispatch(loginUser({ email, password }));
    };

    const handleForgotPassword = async () => {};

    useEffect(() => {
        if (user) {
            navigate('/');
        } else {
            navigate('/login');
        }
        if (message && !isSuccess) {
            getToastError(message);
            dispatch(clearMessage());
        }
    }, [user, isSuccess, navigate, message, dispatch]);
    return (
        <>
            <FormLayout title="Login with email">
                <div className={cx('form-title')}>Enter your Tiki account email and password</div>
                <form onSubmit={handleSubmit(onSubmitLoginForm)}>
                    <InputField name="email" title="Email" register={register} errors={errors} />
                    <InputField name="password" title="Password" register={register} errors={errors} />
                    <Button primary type="submit" className={cx('btn-submit')}>
                        Login
                    </Button>
                </form>
                <div className={cx('forgot-password')} onClick={handleForgotPassword}>
                    Forgot Password ?
                </div>
                <div className={cx('create-account')} onClick={() => navigate('/register')}>
                    No account? <span>Create account</span>
                </div>
                <ToastContainerCustom />
            </FormLayout>
        </>
    );
}

export default Login;
