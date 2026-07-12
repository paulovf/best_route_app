"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCites } from "@/app/api/ibge/search_cities";
import { CityOption } from "@/types/ibge";

interface CityContextType {
  cities: CityOption[];
  isLoadingCities: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

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

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
