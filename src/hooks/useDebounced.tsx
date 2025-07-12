import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value change
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export function useDebounced<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for debounced input handling with immediate UI updates
 * @param initialValue - Initial value for the input
 * @param onDebouncedChange - Callback function to execute when value changes (debounced)
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Object with displayValue, updateValue, and debouncedValue
 */
export function useDebouncedInput(
  initialValue: string,
  onDebouncedChange: (value: string) => void,
  delay: number = 500,
) {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const debouncedValue = useDebounced(displayValue, delay);

  // Call the callback when debounced value changes
  useEffect(() => {
    if (debouncedValue !== initialValue) {
      onDebouncedChange(debouncedValue);
    }
  }, [debouncedValue, onDebouncedChange, initialValue]);

  // Update display value when initial value changes (from external source)
  useEffect(() => {
    setDisplayValue(initialValue);
  }, [initialValue]);

  const updateValue = (newValue: string) => {
    setDisplayValue(newValue);
  };

  return {
    displayValue,
    updateValue,
    debouncedValue,
  };
}
