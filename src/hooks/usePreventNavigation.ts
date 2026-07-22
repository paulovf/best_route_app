import { useEffect } from "react";

/**
 * Create a event listener for monitoring close tab and browser window.
 *
 * @param isBlocking - status for allow or deny monitoring close tab and window browser.
 */
export const usePreventNavigation = (isBlocking: boolean) => {
  useEffect(() => {
    if (!isBlocking) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isBlocking]);
};
