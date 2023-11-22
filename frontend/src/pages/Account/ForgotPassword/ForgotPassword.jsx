import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout/FormLayout';
import styles from '../Account.module.scss';

const cx = classNames.bind(styles);
function ForgotPassword() {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitForm = ({ email }) => {};
    return (
        <>
            <FormLayout title="Forgot password ?">
                <div className={cx('form-title')}>Please enter your account information to retrieve your password</div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <InputField name="email" title="Email" register={register} errors={errors} />
                    <Button primary type="submit" className={cx('btn-submit')}>
                        Password retrieval
                    </Button>
                </form>
            </FormLayout>
        </>
    );
}

export default ForgotPassword;
