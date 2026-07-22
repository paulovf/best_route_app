"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCites } from "@/app/api/ibge/search_cities";
import { CityOption } from "@/types/form";
import { CityContextType } from "@/types/contexts";

export const CityContext = createContext<CityContextType | undefined>(
  undefined,
);

/**
 * Get a cities list in provider (if exists) or call get cities api for get a new list.
 *
 * @param children - children components for add inner city provider.
 * @returns a provider with cities list.
 */
export function CityProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityOption[]>(() => {
    if (typeof window !== "undefined") {
      const savedCities = sessionStorage.getItem("best_route_cities");
      return savedCities ? JSON.parse(savedCities) : [];
    }
    return [];
  });

  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    if (cities.length > 0) return;

    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const validCities = await getCites();
        setCities(validCities);

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
    <CityContext.Provider value={{ cities, isLoadingCities }}>
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
