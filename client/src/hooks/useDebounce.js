import { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delau]);

    return debouncedValue;
}

export default useDebounce;