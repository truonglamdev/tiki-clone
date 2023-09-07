import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/InputField/InputField';
import FormLayout from '~/components/Layout/FormLayout';
import styles from '../Login/Login.module.scss';
const cx = classNames.bind(styles);
function Register() {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });
    return (
        <FormLayout title="Hello">
            <div className={cx('form-title')}>Create account</div>
            <form onSubmit={handleSubmit()}>
                <InputField name="username" title="Username" register={register} errors={errors} />
                <InputField name="password" title="Password" register={register} errors={errors} />
                <Button primary type="submit" className={cx('btn-submit')}>
                    submit
                </Button>
            </form>
        </FormLayout>
    );
}

export default Register;
