import { useState, useEffect } from "react";

export /**
 * Check if page is mounted.
 *
 * @return {*} mounted page status.
 */
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return isMounted;
}
