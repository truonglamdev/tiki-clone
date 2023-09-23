import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import iconImages from '~/images/iconImages';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer-item')}>
                <h4 className={cx('footer-heading')}>Customer support</h4>
                <p className={cx('text', 'small-text')}>
                    Hotline : <a href="tel: 00000000">19001005</a>
                </p>
                <span className={cx('small-text')}>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
            </div>
            <div className={cx('footer-item')}>
                <h4 className={cx('footer-heading')}>About TIKI</h4>
                <p className={cx('text', 'small-text')}>
                    Hotline : <a href="tel: 00000000">19001005</a>
                </p>
                <span className={cx('small-text')}>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
                <a className={cx('small-text')} href="/">
                    frequently asked questions
                </a>
            </div>
            <div className={cx('footer-item')}>
                <h4 className={cx('footer-heading')}>Contact and Links</h4>
                <a className={cx('small-text')} href="/">
                    selling with tiki
                </a>
                <h4 className={cx('footer-heading')}>Certified by</h4>
                <div className={cx('flex')}>
                    <img
                        className={cx('img-tag')}
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                        alt=""
                    />
                    <img
                        className={cx('img-tag')}
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                        alt=""
                    />
                </div>
            </div>
            <div className={cx('footer-item')}>
                <h4 className={cx('footer-heading')}>Payment menthods</h4>
                <div className={cx('flex')}>
                    <img
                        className={cx('img-tag')}
                        src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                        alt=""
                    />
                    <img
                        className={cx('img-tag')}
                        src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                        alt=""
                    />
                    <img
                        className={cx('img-tag')}
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                        alt=""
                    />
                    <img
                        className={cx('img-tag')}
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                        alt=""
                    />
                </div>
                <h4 className={cx('footer-heading')}>Delivery service</h4>
            </div>
            <div className={cx('footer-item')}>
                <h4 className={cx('footer-heading')}>Connect with us</h4>
                <div className={cx('flex')}>
                    <div>
                        <img src={iconImages.qrcode} alt="" className={cx('qr-code')} />
                    </div>
                    <div className={cx('flex-column')}>
                        <img src={iconImages.appStore} alt="" className={cx('download')} />
                        <img src={iconImages.ggPlay} alt="" className={cx('download')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
