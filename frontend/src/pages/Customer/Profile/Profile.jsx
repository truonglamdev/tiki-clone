import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ReactCountryDropdown } from 'react-country-dropdown';
import 'react-country-dropdown/dist/index.css';
import { CiFacebook, CiMail } from 'react-icons/ci';
import { FaGoogle, FaPen } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { TbLock } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import Image from '~/components/Image';
import AccountLayout from '~/components/Layout/AccountLayout';
import Loading from '~/components/Loading/Loading';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import { updateUser } from '~/redux/actions/authAction';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);
function Profile() {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    const [userInfo, setUserInfo] = useState({
        name: '',
        birthday: '',
        country: '',
        nickname: '',
        gender: 'Male',
    });

    const updateUserInfo = (field, value) => {
        console.log(field , "++++++" , value);
        setUserInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        updateUserInfo(name, value);
    };

    const handleSelectCountry = (country) => {
        updateUserInfo('country', country.code);
    };
    const handleSaveChangeInfo = () => {
        if (!userInfo.name) {
            return getToastError('Please enter your name!');
        }
        console.log('check userInfo', userInfo);
        // dispatch(updateUser(user._id, userInfo));
    };

    useEffect(() => {
        updateUserInfo('name', user?.name || '');
        updateUserInfo('nickname', user?.nickname || '');
        updateUserInfo('birthday', user?.birthday || '');
        updateUserInfo('country', user?.country || 'VN');
        updateUserInfo('gender', user?.gender || 'Male');
    }, [user]);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <AccountLayout>
                    <div className={cx('wrapper')}>
                        <div className={cx('header')}>Account information</div>
                        <div className={cx('container')}>
                            <div className={cx('content')}>
                                <div className={cx('content-left')}>
                                    <h3 className={cx('title')}>Personal Information</h3>
                                    <div className={cx('form-info')}>
                                        <div className={cx('form-avatar')}>
                                            <input id="avatar" type="file" hidden />
                                            <label htmlFor="avatar">
                                                <Image alt="avatar" className={cx('avatar-img')} />
                                                <div className={cx('pen-icon')}>
                                                    <FaPen />
                                                </div>
                                            </label>
                                        </div>
                                        <div className={cx('form-name')}>
                                            <div className={cx('form-control')}>
                                                <label className={cx('label')}>Full name</label>
                                                <div className={cx('input-wrap')}>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={userInfo.name}
                                                        className={cx('input')}
                                                        onChange={handleChangeInput}
                                                    />
                                                    <div
                                                        className={cx('close-icon')}
                                                        onClick={() => updateUserInfo('name', '')}
                                                    >
                                                        <IoClose />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('form-control')}>
                                                <label className={cx('label')}>Nickname</label>
                                                <div className={cx('input-wrap')}>
                                                    <input
                                                        type="text"
                                                        name="nickname"
                                                        value={user.nickname}
                                                        className={cx('input')}
                                                        onChange={handleChangeInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}>Birth day</label>
                                        <div className={cx('birthday-wrap')}>
                                            <input
                                                type="date"
                                                name="birthday"
                                                value={user.birthday}
                                                placeholder="Enter Birth Day"
                                                className={cx('input')}
                                                onChange={handleChangeInput}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}>Country</label>
                                        <div className={cx('list-country')}>
                                            <ReactCountryDropdown
                                                onSelect={handleSelectCountry}
                                                countryCode={userInfo.country}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}>Gender</label>
                                        <div className={cx('birthday-wrap')}>
                                            <select
                                                className={cx('input')}
                                                name="gender"
                                                onChange={handleChangeInput}
                                                value={userInfo.gender}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Unknown">Unknown</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}></label>
                                        <Button large className={cx('save-btn')} onClick={handleSaveChangeInfo}>
                                            Save Change
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('vertical')}></div>
                                <div className={cx('content-right')}>
                                    <h3 className={cx('title')}>Phone number and email</h3>
                                    <div className={cx('list')}>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <FiPhone />
                                                <div className={cx('detail')}>
                                                    <span>Phone number</span>
                                                    <span>0879525060</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <CiMail />
                                                <div className={cx('detail')}>
                                                    <span>Email address</span>
                                                    <span>Add email address</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={cx('title')}>Security</h3>
                                    <div className={cx('list')}>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <TbLock />
                                                <div className={cx('detail')}>
                                                    <span>Change Password</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <CiMail />
                                                <div className={cx('detail')}>
                                                    <span>Set pin code</span>
                                                    <span>******</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={cx('title')}>Link Social Media</h3>
                                    <div className={cx('list')}>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <CiFacebook />
                                                <div className={cx('detail')}>
                                                    <span>Facebook</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Link
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('list-item')}>
                                            <div className={cx('info')}>
                                                <FaGoogle />
                                                <div className={cx('detail')}>
                                                    <span>Google</span>
                                                </div>
                                            </div>
                                            <div className={cx('status')}>
                                                <Button small outline>
                                                    Link
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccountLayout>
            )}
        </>
    );
}

export default Profile;
