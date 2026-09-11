import { useCallback, useRef } from 'react';

/**
 * Hook to prevent rapid double clicks on buttons.
 * Executes the function immediately, then blocks subsequent executions for the delay period.
 */
export function useDebouncedClick(callback, delay = 350) {
  const isReady = useRef(true);

  return useCallback(
    (...args) => {
      if (isReady.current) {
        callback(...args);
        isReady.current = false;
        setTimeout(() => {
          isReady.current = true;
        }, delay);
      }
    },
    [callback, delay]
  );
}
