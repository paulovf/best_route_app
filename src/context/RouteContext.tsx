"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Fail } from "@/types/fail";

interface RouteContextType {
  routeData: any | null;
  errorData: Fail | null;
  setRouteData: (data: any) => void;
  setErrorData: (error: Fail) => void;
  clearStorage: () => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routeData, setRouteDataState] = useState<any | null>(null);
  const [errorData, setErrorDataState] = useState<Fail | null>(null);

  useEffect(() => {
    const savedRoute = sessionStorage.getItem("best_route_data");
    const savedError = sessionStorage.getItem("best_route_error");

    if (savedRoute) setRouteDataState(JSON.parse(savedRoute));
    if (savedError) setErrorDataState(JSON.parse(savedError));
  }, []);

  const setRouteData = (data: any) => {
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
    <RouteContext.Provider value={{ routeData, errorData, setRouteData, setErrorData, clearStorage }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used into RouteProvider");
  }
  return context;
}