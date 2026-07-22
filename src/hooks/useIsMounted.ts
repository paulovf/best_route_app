import { useState, useEffect } from "react";

/**
 * Check if page is mounted.
 *
 * @returns mounted page status.
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return isMounted;
}
