import { useState, useEffect } from 'react';

// Debounced search hook with time delay or minimum characters
const useDebouncedSearch = (
  searchTerm: string,
  delay: number = 500,
  minLength: number = 3
): string => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    // Trigger only if searchTerm has at least minLength characters
    if (searchTerm.length >= minLength) {
      const handler = setTimeout(() => {
        setDebouncedValue(searchTerm);
      }, delay);

      return () => {
        clearTimeout(handler); // Clear timeout if searchTerm or delay changes
      };
    } else {
      setDebouncedValue(''); // Reset debounced value if below minLength
    }
  }, [searchTerm, delay, minLength]);

  return debouncedValue;
};

export default useDebouncedSearch;
