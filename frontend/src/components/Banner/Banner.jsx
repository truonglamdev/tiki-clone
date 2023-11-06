import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import iconImages from '~/images/iconImages';
import * as request from '~/utils/request';

const cx = classNames.bind(styles);

function Banner() {
    const images = [
        'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    ];

    const buttonStyle = {
        width: '20px',
        background: 'none',
        border: '0px',
    };
    const properties = {
        prevArrow: (
            <button style={{ ...buttonStyle }}>
                <img src={iconImages.prev} style={{ width: '32px', height: '32px' }} alt="" />
            </button>
        ),
        nextArrow: (
            <button style={{ marginRight: '20px', ...buttonStyle }}>
                <img
                    src={iconImages.prev}
                    style={{ width: '32px', height: '32px', transform: 'rotate(180deg)' }}
                    alt=""
                />
            </button>
        ),
        infinite: true,
    };

    const indicators = () => <div className={cx('indicator')}></div>;

    const handleClick = async () => {
        const res = await request.get('user/650add4ce8a1dc87787aec70', {});
        alert('click me');
        console.log(res);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-slide')}>
                <Slide {...properties} indicators={indicators}>
                    <div className={cx('each-slide-effect')}>
                        <div style={{ backgroundImage: `url(${images[0]})` }}>
                            <span>Slide 1</span>
                        </div>
                    </div>
                    <div className={cx('each-slide-effect')}>
                        <div style={{ backgroundImage: `url(${images[1]})` }}>
                            <span>Slide 2</span>
                        </div>
                    </div>
                    <div className={cx('each-slide-effect')}>
                        <div style={{ backgroundImage: `url(${images[2]})` }}>
                            <span>Slide 3</span>
                        </div>
                    </div>
                </Slide>
            </div>

            <div className={cx('banner-img')} onClick={handleClick}>
                <img src={images[1]} alt="" />
            </div>
        </div>
    );
}

export default Banner;
