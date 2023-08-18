// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const cx = classNames.bind(styles);
function ProductItem() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Link to={`/products`} className={cx('product-item')}>
                    <img
                        className={cx('product-image')}
                        src="https://salt.tikicdn.com/cache/280x280/ts/product/8b/1f/d8/fe77cababd0fe575333a17ef5432dabb.jpg.webp"
                        alt=""
                    />
                    <div className={cx('product-info')}>
                        <div className={cx('product-badges')}>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/ef/80/a5/d3d50d02f2764eb4ad06d833bf893b76.png"
                                className={cx('dynamic-icon-badge')}
                                alt=""
                            />

                            <p>Tài trợ</p>
                        </div>
                        <div className={cx('product-description')}>
                            <h3 className={cx('name')}>
                                Apple Iphone 12 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
                                deserunt quae provident, nihil soluta, maiores nisi veniam, repudiandae consectetur
                                quibusdam praesentium. Voluptatem quas quos aperiam perspiciatis esse eos nesciunt
                                temporibus?
                            </h3>
                            <div className={cx('ratings')}>
                                <div>
                                    <StarRatings
                                        rating={5}
                                        numberOfStars={5}
                                        starRatedColor={'#fec401'}
                                        starEmptyColor={'#dedde3'}
                                        starDimension="14px"
                                        starSpacing="2px"
                                    />
                                </div>
                                <div className={cx('quantity')}>Đã bán 1000+</div>
                            </div>
                        </div>
                        <div className={cx('product-cost')}>
                            <div className={cx('price-discount')}>
                                <div className={cx('price')}>
                                    13.000.000 <sub>đ</sub>
                                </div>
                                <div className={cx('discount')}> -19% </div>
                            </div>
                            <div className={cx('badge-under')}>
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/e9/14/26/52318ad1543ad9d3ee5b633b3df0750d.png"
                                    alt=""
                                />
                                <span className={cx('text')}>Hoàn 155 ASA</span>
                            </div>
                        </div>
                        <div className={cx('delivery')}>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/bf/5b/b9/f54345d674f86ab1bc3f8a68e91ee049.png"
                                alt=""
                            />
                            <span className={cx('text')}>Giao siêu tốc 2h</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
// ProductItem.propTypes = {
//     data: PropTypes.object.isRequired,
// };

export default ProductItem;
