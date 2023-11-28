import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, [delay]);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
