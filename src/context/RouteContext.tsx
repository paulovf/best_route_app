"use client";

import React, { createContext, useContext, useState } from "react";
import { Fail } from "@/types/fail";
import { RouteApiResponse } from "@/types/route";
import { RouteContextType } from "@/types/contexts";

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export /**
 * Get a route api response in provider (if exists) or call routes api for get a new routes response.
 *
 * @param {{ children: React.ReactNode }} { children } - children components for add inner route provider.
 * @return {*} a provider with route response api.
 */
function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routeData, setRouteDataState] = useState<RouteApiResponse | null>(
    () => {
      if (typeof window !== "undefined") {
        const savedRoute = sessionStorage.getItem("best_route_data");
        return savedRoute ? JSON.parse(savedRoute) : null;
      }
      return null;
    },
  );

  const [errorData, setErrorDataState] = useState<Fail | null>(() => {
    if (typeof window !== "undefined") {
      const savedError = sessionStorage.getItem("best_route_error");
      return savedError ? JSON.parse(savedError) : null;
    }
    return null;
  });

  const setRouteData = (data: RouteApiResponse) => {
    setRouteDataState(data);
    setErrorDataState(null);
    sessionStorage.setItem("best_route_data", JSON.stringify(data));
    sessionStorage.removeItem("best_route_error");
  };

  const setErrorData = (error: Fail) => {
    setErrorDataState(error);
    setRouteDataState(null);
    sessionStorage.setItem("best_route_error", JSON.stringify(error));
    sessionStorage.removeItem("best_route_data");
  };

  const clearStorage = () => {
    setRouteDataState(null);
    setErrorDataState(null);
    sessionStorage.removeItem("best_route_data");
    sessionStorage.removeItem("best_route_error");
  };

  return (
    <RouteContext.Provider
      value={{ routeData, errorData, setRouteData, setErrorData, clearStorage }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export /**
 * Get a use route context.
 *
 * @return {*} a current use route context.
 * @throws Error in use route without in provider.
 */
function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used into RouteProvider");
  }
  return context;
}
