"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CityOption,
  CitySearchContextType,
  CitySearchRouteApiResponse,
} from "@/features/city-search/types";
import { getCites } from "@/features/city-search/services/citySearchService";

export const CityContext = createContext<CitySearchContextType | undefined>(
  undefined,
);

/**
 * Get a cities list in provider (if exists) or call get cities api for get a new list.
 *
 * @param children - children components for add inner city provider.
 * @returns a provider with cities list.
 */
export function CityProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [cities, setCities] = useState<CityOption[]>(() => {
    if (typeof window !== "undefined") {
      const savedCities = sessionStorage.getItem("best_route_cities");
      if (
        savedCities !== undefined &&
        savedCities !== null &&
        savedCities !== "undefined"
      ) {
        return savedCities ? JSON.parse(savedCities) : [];
      } else {
        return [];
      }
    }
    return [];
  });

  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    if (cities.length > 0) return;

    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const validCities: CitySearchRouteApiResponse = await getCites();
        setCities(validCities.list);

        sessionStorage.setItem(
          "best_route_cities",
          JSON.stringify(validCities),
        );
      } catch (error) {
        console.error("Failed to fetch cities globally:", error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, [cities.length]);

  return (
    <CityContext.Provider
      value={useMemo(
        () => ({ cities, isLoadingCities, setCities }),
        [cities, isLoadingCities, setCities],
      )}
    >
      {children}
    </CityContext.Provider>
  );
}

/**
 * Get a use city context.
 *
 * @returns a current use city context.
 * @throws Error in use city without in provider.
 */
export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
