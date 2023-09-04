import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SideBar from '~/components/Layout/SideBar';
import Banner from '~/components/Banner';
import Products from '~/components/Products';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home', 'container-header')}>
                <div className={cx('side-bar')}>
                    <SideBar />
                </div>
                <div className={cx('content')}>
                    <Banner />
                    <Products />
                </div>
            </div>
        </div>
    );
}

export default Home;
