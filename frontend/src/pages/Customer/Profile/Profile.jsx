import AccountLayout from '~/components/Layout/AccountLayout';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { FaPen } from 'react-icons/fa';
import Button from '~/components/Button';
import { IoClose } from 'react-icons/io5';
const cx = classNames.bind(styles);
function Profile() {
    return (
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
                                        <div className={cx('avatar-box')}>
                                            <Image alt="avatar" className={cx('avatar-img')} />
                                            <div className={cx('pen-icon')}>
                                                <FaPen />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className={cx('form-name')}>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}>Full name</label>
                                        <div className={cx('input-wrap')}>
                                            <input type="text" className={cx('input')} />
                                            <div className={cx('close-icon')}>
                                                <IoClose />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-control')}>
                                        <label className={cx('label')}>Nickname</label>
                                        <input type="text" className={cx('input')} />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-control')}>
                                <label className={cx('label')}>Birth day</label>
                                <div className={cx('birthday-wrap')}></div>
                            </div>
                            <div className={cx('form-control')}>
                                <label className={cx('label')}>Birth day</label>
                                <div className={cx('birthday-wrap')}></div>
                            </div>
                            <div className={cx('form-control')}>
                                <label className={cx('label')}>Birth day</label>
                                <div className={cx('birthday-wrap')}></div>
                            </div>
                            <div className={cx('form-control')}>
                                <label className={cx('label')}></label>
                                <Button large className={cx('save-btn')}>
                                    Save Change
                                </Button>
                            </div>
                        </div>
                        <div className={cx('vertical')}></div>
                        <div className={cx('content-right')}>
                            <h3 className={cx('title')}>Personal Information</h3>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

export default Profile;
