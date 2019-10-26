import { useEffect, useState } from "react";
import styled from "styled-components/macro";

// https://usehooks.com/useDebounce/
// Hook
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export const Button = styled.button`
  background: hsla(175, 50%, 50%, 1);
  border: none;
  border-radius: 4px;
  box-shadow: 0px 1px 4px hsla(0, 0%, 50%, 0.3),
    0px 3px 4px hsla(0, 0%, 50%, 0.3), 0px 1px 2px hsla(0, 0%, 50%, 0.3);
  color: hsla(155, 30%, 90%, 1);
  font-size: 18px;
  outline: none;
  padding: 12px 24px;

  &:hover {
    background: hsla(175, 70%, 20%, 1);
    cursor: pointer;
  }

  &:active {
    background: hsla(175, 50%, 50%, 1);
    box-shadow: none;
  }
`;

export const Card = styled.div`
  border-radius: 4px;
  box-shadow: 0px 3px 10px hsla(0, 0%, 50%, 0.3),
    0px 3px 4px hsla(0, 0%, 50%, 0.3), 0px 1px 2px hsla(0, 0%, 50%, 0.3);
  max-width: 400px;
  overflow: hidden;
  padding: 0;
  width: 100%;
`;

export const CardHeader = styled.div`
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.3);
  font-size: 18px;
  font-weight: 500;
  list-style-type: none;
  padding: 16px;
`;
