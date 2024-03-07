import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import { LuUserPlus } from 'react-icons/lu';
import Modal from 'react-modal';
import { Transition } from 'react-transition-group';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/InputField/InputField';
import AccountLayout from '~/components/Layout/AccountLayout';
import Loading from '~/components/Loading';
import { getToastError, getToastSuccess } from '~/customs/toastMessage/toastMessage';
import * as request from '~/utils/request';

import CustomersTable from '../Components/Table/CustomersTable';
import styles from './Customers.module.scss';

const cx = classNames.bind(styles);
export default function Customers() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const nodeRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
            minWidth: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
        },
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').min(6).max(32),
        confirmPassword: Yup.string().required('Confirm Password is required').min(6).max(32),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmitAddNewUserForm = async ({ name, email, password, confirmPassword }) => {
        const data = { name, email, password, confirmPassword };
        const res = await request.post('auth/register', data);
        if (res && res?.user) {
            getToastSuccess(res?.message);
            setIsOpenModal(false);
            reset();
        } else {
            getToastError(res?.message);
        }
    };

    useEffect(() => {
        const getAllUser = async () => {
            setIsLoading(true);
            const res = await request.get('/users');
            if (res && res?.data) {
                setUsers(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                getToastError(res?.message);
            }
        };
        getAllUser();
    }, []);

    return (
        <AccountLayout isAdmin>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('wrapper')}>
                        <div className={cx('header')}>Customers</div>
                        <div className={cx('create-btn')}>
                            <Button medium outline leftIcon={<LuUserPlus />} onClick={() => setIsOpenModal(true)}>
                                Create new
                            </Button>
                        </div>
                        <CustomersTable data={users} />
                    </div>
                    <Transition nodeRef={nodeRef.current} in={isOpenModal} timeout={200} classNames="modal">
                        <Modal ref={nodeRef} isOpen={isOpenModal} style={customStylesModal} closeTimeoutMS={200}>
                            <div className={cx('model-wrapper')}>
                                <div className={cx('modal-header')}>
                                    <span>Create new customers</span>
                                    <IoIosClose onClick={() => setIsOpenModal(false)} />
                                </div>
                                <div className={cx('model-content')}>
                                    <form onSubmit={handleSubmit(onSubmitAddNewUserForm)}>
                                        <InputField name="name" title="Name" register={register} errors={errors} />
                                        <InputField name="email" title="Email" register={register} errors={errors} />
                                        <InputField
                                            name="password"
                                            title="Password"
                                            register={register}
                                            errors={errors}
                                        />
                                        <InputField
                                            name="confirmPassword"
                                            title="Confirm Password"
                                            register={register}
                                            errors={errors}
                                        />
                                        <Button type="submit" medium primary className={cx('btn-submit')}>
                                            Add new
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </Transition>
                </>
            )}
        </AccountLayout>
    );
}
