/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import noImage from '~/images/noImage.png';

const Image = forwardRef(({ src = noImage, className, fallback: customFallback = noImage, ...props }, ref) => {
    const [fallbackSrc, setFallbackSrc] = useState('');
    const handleError = () => {
        setFallbackSrc(customFallback);
    };
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

export default Image;
