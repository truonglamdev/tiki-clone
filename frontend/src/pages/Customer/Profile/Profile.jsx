import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { CountryDropdown } from 'react-country-region-selector';
import { CiFacebook, CiMail } from 'react-icons/ci';
import { FaGoogle, FaPen } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { TbLock } from 'react-icons/tb';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import AccountLayout from '~/components/Layout/AccountLayout';
import { getToastError, getToastSuccess, getToastWarning } from '~/customs/toastMessage/toastMessage';
import noImage from '~/images/noImage.png';
import { clearMessage, updateAvatar, updateUser } from '~/redux/actions/authAction';
import ChangePassword from './ChangePassword/ChangePassword';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const { user, isLoading, message, isSuccess } = useSelector((state) => state.auth);

    const [userInfo, setUserInfo] = useState({
        name: '',
        birthday: '',
        country: '',
        nickname: '',
        gender: 'Male',
        phone: '00000000000',
    });
    const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false);
    const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
    const [isOpenModalChangePass, setIsOpenModalChangePass] = useState(false);
    const [preview, setPreview] = useState(noImage);
    const [avatar, setAvatar] = useState(noImage);

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
            borderRadius: '10px',
            transition: 'all 2s linear',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00000087',
        },
    };
    const updateUserInfo = (field, value) => {
        setUserInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        updateUserInfo(name, value);
    };

    const handleSelectCountry = (country) => {
        updateUserInfo('country', country);
    };
    const handleSaveChangeInfo = () => {
        if (!userInfo.name) {
            return getToastWarning('Please enter your info!');
        }
        dispatch(updateUser(user._id, userInfo));
        if (isSuccess) {
            getToastSuccess('Update information successfully');
        }
    };

    const onCropAvatar = (prv) => {
        setPreview(prv);
    };

    const onBeforeFileLoad = (e) => {
        if (e.target.files[0].size > 71680) {
            getToastWarning('File is too big!');
            e.target.value = '';
        }
    };

    const handleOnFileLoad = (file) => {
        setAvatar(file);
    };

    const handleSaveAvatar = async () => {
        if (!avatar) {
            return getToastWarning('Please select an avatar!');
        } else {
            let formData = new FormData();
            formData.append('images', avatar);
            await dispatch(updateAvatar(user._id, formData));
            formData.delete('images');
            setAvatar(null);
            getToastSuccess('Avatar update successfully');
            setIsOpenModalAvatar(false);
        }
    };

    const handleShowModalPass = () => {
        setIsOpenModalChangePass(false);
    };

    useEffect(() => {
        updateUserInfo('name', user?.name || '');
        updateUserInfo('nickname', user?.nickname || '');
        updateUserInfo('birthday', user?.birthday || '');
        updateUserInfo('country', user?.country || 'VN');
        updateUserInfo('gender', user?.gender || 'Male');
        updateUserInfo('phone', user?.phone || '');
        if (user?.avatar?.url) {
            setPreview(user?.avatar.url);
        }
        if (!isSuccess && message) {
            getToastError(message);
            dispatch(clearMessage());
        }
    }, [user, isSuccess, message, dispatch]);

    return (
        <>
            <AccountLayout>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>Account information</div>
                    <div className={cx('container')}>
                        <div className={cx('content')}>
                            <div className={cx('content-left')}>
                                <h3 className={cx('title')}>Personal Information</h3>
                                <div className={cx('form-info')}>
                                    <div className={cx('form-avatar')}>
                                        <div className={cx('preview-img')} onClick={() => setIsOpenModalAvatar(true)}>
                                            <img src={preview} alt="avatar" className={cx('avatar-img')} />
                                            <div className={cx('pen-icon')}>
                                                <FaPen />
                                            </div>
                                        </div>
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
                                                    value={userInfo.nickname}
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
                                            value={userInfo.birthday}
                                            placeholder="Enter Birth Day"
                                            className={cx('input')}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx('form-control')}>
                                    <label className={cx('label')}>Country</label>
                                    <div className={cx('birthday-wrap')}>
                                        <CountryDropdown
                                            classes={cx('input')}
                                            value={userInfo.country}
                                            onChange={handleSelectCountry}
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
                                    <Button
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                        large
                                        className={cx('save-btn')}
                                        onClick={handleSaveChangeInfo}
                                    >
                                        Save Change
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('vertical')}></div>
                            <div className={cx('content-right')}>
                                <h3 className={cx('title')}>Phone number </h3>
                                <div className={cx('list')}>
                                    <div className={cx('list-item')}>
                                        <div className={cx('info')}>
                                            <FiPhone />
                                            <div className={cx('detail')}>
                                                <span>Phone number</span>
                                                <span>{userInfo.phone}</span>
                                            </div>
                                        </div>
                                        <div className={cx('status')}>
                                            <Button small outline onClick={() => setIsOpenModalAddress(true)}>
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
                                            <Button small outline onClick={() => setIsOpenModalChangePass(true)}>
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
                                            <Button
                                                small
                                                outline
                                                onClick={() => getToastWarning('This function is being updated!')}
                                            >
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
                                            <Button
                                                small
                                                outline
                                                onClick={() => getToastWarning('This function is being updated!')}
                                            >
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
                                            <Button
                                                small
                                                outline
                                                onClick={() => getToastWarning('This function is being updated!')}
                                            >
                                                Link
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={isOpenModalAvatar} style={customStylesModal}>
                        <div className={cx('preview-modal')}>
                            <div className={cx('preview-header')}>
                                <h2>Update avatar</h2>
                                <MdClose onClick={() => setIsOpenModalAvatar(false)} />
                            </div>
                            <div className={cx('preview-content')}>
                                <div className={cx('img-edit')}>
                                    <Avatar
                                        imageHeight={280}
                                        imageWidth={280}
                                        onCrop={onCropAvatar}
                                        onBeforeFileLoad={onBeforeFileLoad}
                                        onFileLoad={handleOnFileLoad}
                                        label="Select your avatar"
                                    />
                                </div>
                                <img src={preview} className={cx('preview-img')} alt="Avatar" />
                            </div>
                            <Button
                                isLoading={isLoading}
                                disabled={isLoading}
                                large
                                className={cx('save-btn')}
                                onClick={handleSaveAvatar}
                                style={{ margin: '10px auto' }}
                            >
                                Save Change
                            </Button>
                        </div>
                    </Modal>
                    <Modal isOpen={isOpenModalAddress} style={customStylesModal}>
                        <div className={cx('update-modal')}>
                            <div className={cx('preview-header')}>
                                <h2>Update phone number</h2>
                                <MdClose onClick={() => setIsOpenModalAddress(false)} />
                            </div>
                            <div className={cx('form-control', 'form-update')}>
                                <label className={cx('label')}>Phone number</label>
                                <div className={cx('input-wrap')}>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={userInfo.phone}
                                        className={cx('input')}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                                <Button
                                    medium
                                    className={cx('min-btn')}
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                    onClick={handleSaveChangeInfo}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Modal>
                    <ChangePassword isOpen={isOpenModalChangePass} setIsOpenModal={handleShowModalPass} />
                </div>
            </AccountLayout>
        </>
    );
}

export default Profile;
