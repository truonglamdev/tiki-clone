import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import notfound from '~/images/notfound.png'
import notfound404 from '~/images/notfound404.png';

const cx = classNames.bind(styles);
export default function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('banner-top')}></div>
                <div className={cx('banner-bottom')}></div>
                <div className={cx('banner-content')}>
                    <div className={cx('item-1')}>
                        <img src={notfound} alt="" />
                    </div>
                    <div className={cx('item-2')}>
                        <img src={notfound404} alt="" />
                    </div>
                    <div className={cx('item-3')}>Sorry, the page you are looking for does not exist!</div>
                </div>
            </div>
            <div className={cx('navigate')}></div>
        </div>
    );
}
