"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Fail } from "@/types/fail";
import { RouteApiResponse } from "@/types/route";
import { RouteContextType } from "@/types/contexts";

const RouteContext = createContext<RouteContextType | undefined>(undefined);

/**
 * Get a route api response in provider (if exists) or call routes api for get a new routes response.
 *
 * @param children - children components for add inner route provider.
 * @returns a provider with route response api.
 */
export function RouteProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [routeData, setRouteData] = useState<RouteApiResponse | null>(() => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("best_route_data");
      return savedRoute ? JSON.parse(savedRoute) : null;
    }
    return null;
  });

  const [errorData, setErrorData] = useState<Fail | null>(() => {
    if (typeof window !== "undefined") {
      const savedError = sessionStorage.getItem("best_route_error");
      return savedError ? JSON.parse(savedError) : null;
    }
    return null;
  });

  const setRouteDataState = setRouteData;

  const updateRouteData = useCallback(
    (data: RouteApiResponse) => {
      setRouteDataState(data);
      setErrorData(null);
      sessionStorage.setItem("best_route_data", JSON.stringify(data));
      sessionStorage.removeItem("best_route_error");
    },
    [setRouteDataState, setErrorData],
  );

  const updateErrorData = useCallback(
    (error: Fail) => {
      setErrorData(error);
      setRouteDataState(null);
      sessionStorage.setItem("best_route_error", JSON.stringify(error));
      sessionStorage.removeItem("best_route_data");
    },
    [setErrorData, setRouteDataState],
  );

  const clearStorage = useCallback(() => {
    setRouteDataState(null);
    setErrorData(null);
    sessionStorage.removeItem("best_route_data");
    sessionStorage.removeItem("best_route_error");
  }, [setRouteDataState]);

  return (
    <RouteContext.Provider
      value={useMemo(
        () => ({
          routeData,
          errorData,
          setRouteData: updateRouteData,
          setErrorData: updateErrorData,
          clearStorage,
        }),
        [routeData, errorData, updateRouteData, updateErrorData, clearStorage],
      )}
    >
      {children}
    </RouteContext.Provider>
  );
}

/**
 * Get a use route context.
 *
 * @returns a current use route context.
 * @throws Error in use route without in provider.
 */
export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used into RouteProvider");
  }
  return context;
}
