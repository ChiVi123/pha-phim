import React from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
    const [debounce, setDebounce] = React.useState<T>(value);
    React.useEffect(() => {
        const timeoutId = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(timeoutId);
    }, [delay, value]);

    return debounce;
};
