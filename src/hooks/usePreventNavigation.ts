import { useEffect } from "react";

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
