import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);
function Login() {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = ({ username, password }) => {
        console.log(username);
        console.log(password);
    };

    const handleForgotPassword = () => {
        alert('forgot password');
    };
    const handleCreateAccount = () => {
        alert('create account');
    };
    return (
        <FormLayout title="Login with email">
            <div className={cx('form-title')}>Enter your Tiki account email and password</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name="username" title="Username" register={register} errors={errors} />
                <InputField name="password" title="Password" register={register} errors={errors} />
                <Button primary type="submit" className={cx('btn-submit')}>
                    submit
                </Button>
            </form>
            <div className={cx('forgot-password')} onClick={handleForgotPassword}>
                Forgot Password ?
            </div>
            <div className={cx('create-account')} onClick={handleCreateAccount}>
                No account? <span>Create account</span>
            </div>
        </FormLayout>
    );
}

export default Login;
