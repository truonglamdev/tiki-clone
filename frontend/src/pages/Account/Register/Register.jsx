import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import Loading from '~/components/Loading';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import { clearMessage, registerUser } from '~/redux/actions/authAction';
import styles from '../Account.module.scss';

const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isSuccess, message, user } = useSelector((state) => state.auth);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').min(6).max(32),
        confirmPassword: Yup.string().required('Confirm Password is required').min(6).max(32),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitRegisterForm = ({ name, email, password, confirmPassword }) => {
        dispatch(registerUser({ name, email, password, confirmPassword }));
    };

    useEffect(() => {
        if (isSuccess && user) {
            navigate('/login');
        } else {
            if (message) {
                getToastError(message);
            }
        }
        dispatch(clearMessage());
    }, [isSuccess, message, dispatch, navigate, user]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <FormLayout title="Hello">
                    <div className={cx('form-title')}>Create account</div>
                    <form onSubmit={handleSubmit(onSubmitRegisterForm)}>
                        <InputField name="name" title="Name" register={register} errors={errors} />
                        <InputField name="email" title="Email" register={register} errors={errors} />
                        <InputField name="password" title="Password" register={register} errors={errors} />
                        <InputField
                            name="confirmPassword"
                            title="Confirm Password"
                            register={register}
                            errors={errors}
                        />
                        <Button primary type="submit" className={cx('btn-submit')}>
                            Register
                        </Button>
                    </form>
                </FormLayout>
            )}
        </>
    );
}

export default Register;
