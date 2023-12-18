/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import noImage from '~/images/noImage.png';
import PropTypes from 'prop-types';

const Image = forwardRef(({ src, className, fallback: customFallback = noImage, ...props }, ref) => {
    const [fallbackSrc, setFallbackSrc] = useState('');

    const handleError = () => {
        setFallbackSrc(customFallback);
    };
    useEffect(() => {}, [src]);
    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, className)}
            src={fallbackSrc || src}
            alt=""
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
