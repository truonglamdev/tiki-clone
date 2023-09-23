/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Button from '~/components/Button/Button';
import Image from '~/components/Image/Image';
import ColorItem from '~/components/Tag/ColorItem';
import iconImages from '~/images/iconImages';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);
function ProductDetail() {
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClickPreviewImg = (index) => {
        setCurrentIndex(index);
    };

    const HandleChangeAddress = () => {
        alert('change address');
    };

    const previewImages = [
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/0f/08/21/d46f8159e0ad5dff0192b9316e7d415f.png.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
        {
            src: 'https://salt.tikicdn.com/cache/750x750/ts/product/14/6b/10/e34b9bf5aaea1b7eb8af9cbb5467444c.jpg.webp',
            alt: '',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-detail-box', 'container')}>
                <div className={cx('content-left')}>
                    <img
                        src={previewImages.length > 0 && previewImages[currentIndex].src}
                        className={cx('show-img')}
                        alt=""
                        onClick={() => setIsOpenLightBox(true)}
                    />
                    <div className={cx('preview')}>
                        {previewImages.map((img, index) => {
                            return (
                                <div key={index} className={cx('preview-list')}>
                                    {index < 5 ? (
                                        <div
                                            className={cx('preview-link')}
                                            onClick={() => handleClickPreviewImg(index)}
                                        >
                                            <img src={img.src} alt="" className={cx('preview-img')} />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {index === 5 ? (
                                        <div className={cx('gallery', 'preview-link')}>
                                            <img src={img.src} alt="" className={cx('preview-img')} />
                                            <span>Xem thêm 2 ảnh</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('separate')}></div>
                <div className={cx('content-right')}>
                    <div className={cx('header')}>
                        <span className={cx('brand')}>
                            <h6>Brand : </h6>
                            <Link to="/">Apple</Link>
                        </span>
                        <div className={cx('title')}>Apple iPhone 14 Pro Max</div>
                        <div className={cx('rating')}>
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
                            <div className={cx('viewer')}>(View 504 reviews) </div>
                            <div className={cx('quantity-sold')}>Sold 3028</div>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('body-left')}>
                            <div className={cx('price-discount')}>
                                <div className={cx('current-price')}>26.450.000 ₫</div>
                                <div className={cx('list-price')}>33.990.000 ₫</div>
                                <div className={cx('discount-rate')}>-22%</div>
                            </div>
                            <div className={cx('options')}>
                                <div className={cx('styles')}>
                                    <div className={cx('option-name')}>
                                        Color : <span>Black</span>
                                    </div>
                                    <div className={cx('option-list')}>
                                        <ColorItem />
                                        <ColorItem />
                                        <ColorItem />
                                    </div>
                                </div>
                                <div className={cx('styles')}>
                                    <div className={cx('option-name')}>
                                        Memory : <span>128GB</span>
                                    </div>
                                    <div className={cx('option-list')}>
                                        <ColorItem size="small" />
                                        <ColorItem size="small" />
                                        <ColorItem size="small" />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('address')}>
                                <span>Address: </span>
                                <span className={cx('address-current')}>TP. Tam Kỳ, P. Tân Thạnh, Quảng Nam </span>
                                <span className={cx('address-change')} onClick={HandleChangeAddress}>
                                    -Change
                                </span>
                            </div>
                            <div className={cx('quantity-mess')}>
                                <span>Quantity</span>
                                <div className={cx('quantity-wrapper')}>
                                    <button className={cx('quantity-btn-inc')}>-</button>
                                    <input type="text" className={cx('quantity-input')} value={1} />
                                    <button className={cx('quantity-btn-des')}>+</button>
                                </div>
                            </div>

                            <div className={cx('group-btn')}>
                                <Button primary large>
                                    Buy Now
                                </Button>
                                <Button outline large>
                                    Installment
                                </Button>
                            </div>
                        </div>
                        <div className={cx('body-right')}>
                            <div className={cx('seller-info')}>
                                <Link className={cx('overview')} to="/">
                                    <img src={iconImages.tiki} alt="tiki-logo" />
                                </Link>
                                <div className={cx('overview-right')}>
                                    <span className={cx('seller-name')}>Tiki Trading</span>
                                    <img src={iconImages.official} alt="official" />
                                </div>
                            </div>
                            <div className={cx('seller-details')}>
                                <div className={cx('seller-review')}>
                                    <div className={cx('seller-title')}>
                                        <span>4.7/5</span>
                                        <StarFilled className={cx('start-icon')} />
                                    </div>
                                    <div className={cx('seller-subtitle')}>5.4tr+</div>
                                </div>
                                <div className={cx('border-left')}></div>
                                <div className={cx('seller-normal')}>
                                    <div className={cx('seller-title')}>
                                        <span>7325k+</span>
                                    </div>
                                    <div className={cx('seller-subtitle')}>Theo dõi</div>
                                </div>
                            </div>
                            <div className={cx('seller-action')}>
                                <Button
                                    to="https://google.com"
                                    outline
                                    small
                                    leftIcon={
                                        <Image
                                            src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png"
                                            className={cx('button-icon')}
                                        />
                                    }
                                >
                                    See Shop
                                </Button>
                                <Button
                                    to="https://google.com"
                                    outline
                                    small
                                    leftIcon={
                                        <Image
                                            src="https://salt.tikicdn.com/ts/upload/5b/bf/3c/eeda00767e26b5873030e44f951441c4.png"
                                            className={cx('button-icon')}
                                        />
                                    }
                                >
                                    Follow
                                </Button>
                            </div>

                            <div className={cx('warranty')}>
                                <div className={cx('warranty-item')}>
                                    <span className={cx('warranty-left')}>Warranty period</span>
                                    <span className={cx('warranty-right')}>12 months</span>
                                </div>
                                <div className={cx('warranty-item')}>
                                    <span className={cx('warranty-left')}>Warranty conditions</span>
                                    <span className={cx('warranty-right')}>Invoid</span>
                                </div>
                                <div className={cx('warranty-item')}>
                                    <span className={cx('warranty-left')}>Warranty place</span>
                                    <span className={cx('warranty-right')}>Manufacture's warranty</span>
                                </div>
                                <div className={cx('warranty-item')}>
                                    <span className={cx('warranty-left')}>Warranty instructions</span>
                                    <span className={cx('warranty-right')}>12 months</span>
                                </div>
                                <a className={cx('see-more')}>See more</a>
                            </div>

                            <div className={cx('customer-benefit')}>
                                <div className={cx('benefit-item')}>
                                    <Image
                                        className={cx('benefit-icon')}
                                        src={iconImages.security}
                                        alt="security icon"
                                    />
                                    <span>Refund 111% if the product is fake</span>
                                </div>
                                <div className={cx('benefit-item')}>
                                    <Image className={cx('benefit-icon')} src={iconImages.like} alt="security icon" />
                                    <span>Refund 111% if the product is fake</span>
                                </div>
                                <div className={cx('benefit-item')}>
                                    <Image className={cx('benefit-icon')} src={iconImages.back} alt="security icon" />
                                    <span>Refund 111% if the product is fake</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SlideshowLightbox
                images={previewImages}
                showThumbnails={true}
                open={isOpenLightBox}
                lightboxIdentifier="lbox1"
                startingSlideIndex={currentIndex}
                onClose={() => {
                    setIsOpenLightBox(false);
                }}
            ></SlideshowLightbox>
        </div>
    );
}

export default ProductDetail;
