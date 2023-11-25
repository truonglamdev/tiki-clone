import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import Loading from '~/components/Loading/Loading';

import styles from '../Account.module.scss';
import { clearMessage, resetPassword } from '~/redux/actions/authAction';
import { getToastError } from '~/customs/toastMessage/toastMessage';
const cx = classNames.bind(styles);
function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, isSuccess, message } = useSelector((state) => state.user);

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(6).max(32),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(6)
            .max(32),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const handleSubmitForm = ({ password, confirmPassword }) => {
        dispatch(resetPassword(id, { password, confirmPassword }));
    };

    useEffect(() => {
        if (!isSuccess && message) {
            getToastError(message);
        }
        if (isSuccess) {
            navigate('/login');
        }
        dispatch(clearMessage());
    }, [isSuccess, message, dispatch, navigate]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <FormLayout title="Reset Password">
                    <div className={cx('form-title')}>Enter your Tiki account email and password</div>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <InputField name="password" title="Password" register={register} errors={errors} />
                        <InputField
                            name="confirmPassword"
                            title="Confirm Password"
                            register={register}
                            errors={errors}
                        />
                        <Button primary type="submit" className={cx('btn-submit')}>
                            Submit
                        </Button>
                    </form>
                </FormLayout>
            )}
        </>
    );
}

export default ResetPassword;
