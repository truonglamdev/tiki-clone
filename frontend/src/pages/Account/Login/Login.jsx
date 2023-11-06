import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import { loginUser } from '~/redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useEffect } from 'react';
import ToastContainerCustom from '~/customs/toastMessage/ToastContainerCustom';
import { getToastError, getToastSuccess, getToastWarning } from '~/customs/toastMessage/toastMessage';
import * as request from '~/utils/request';
const cx = classNames.bind(styles);
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, message } = useSelector((state) => state.user);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email')
            .matches(/^(?!.*@[^,]*,)/, 'Email must be a valid email'),
        password: Yup.string().required('Password is required').min(6).max(32),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = ({ email, password }) => {
        console.log(email, password);
        dispatch(loginUser({ email, password }));
    };

    const handleForgotPassword = async () => {
        alert('forgot password');
        const res = await request.get('products');
        console.log('pr', res);
    };
    const handleCreateAccount = () => {
        alert('create account');
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        } else {
            if (message) {
                getToastError(message);
            }
            navigate('/login');
        }
    }, [user, isSuccess, navigate, message]);
    return (
        <FormLayout title="Login with email">
            <div className={cx('form-title')}>Enter your Tiki account email and password</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name="email" title="Email" register={register} errors={errors} />
                <InputField name="password" title="Password" register={register} errors={errors} />
                <Button primary type="submit" className={cx('btn-submit')}>
                    Login
                </Button>
            </form>
            <div className={cx('forgot-password')} onClick={handleForgotPassword}>
                Forgot Password ?
            </div>
            <div className={cx('create-account')} onClick={handleCreateAccount}>
                No account? <span>Create account</span>
            </div>
            <ToastContainerCustom />
        </FormLayout>
    );
}

export default Login;
