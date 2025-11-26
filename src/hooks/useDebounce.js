import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // cleanup on change/unmount
    };
  }, [value, delay]);

  return debouncedValue;
}
