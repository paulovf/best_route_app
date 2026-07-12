"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { getCites } from "@/app/api/ibge/search_cities";
import { CityOption, CityAutocompleteProps } from "@/types/ibge";

export function CityFormField({
  placeholder,
  namePrefix,
  value,
  onChange,
}: CityAutocompleteProps) {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [query, setQuery] = useState(value ? value.displayName : "");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const validCities = await getCites();
        setCities(validCities);
      } catch (error) {
        console.error("Failed to fetch cities in component:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities =
    query === ""
      ? []
      : cities
          .filter((city) => {
            const normalize = (str: string) =>
              str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            return normalize(city.displayName).includes(normalize(query));
          })
          .slice(0, 10);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative flex items-center">
        <MapPin
          className={`w-5 h-5 absolute left-3 pointer-events-none ${
            value ? "text-neutral-900" : "text-slate-400"
          }`}
        />

        <input
          id={namePrefix}
          type="text"
          className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-400 bg-white text-sm text-neutral-900 focus-primary focus:border-neutral-900 transition placeholder-slate-400 focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(null);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          required
        />
      </div>

      <input
        type="hidden"
        name={`${namePrefix}_city`}
        value={value?.name || ""}
      />
      <input
        type="hidden"
        name={`${namePrefix}_state`}
        value={value?.uf || ""}
      />

      {isOpen && query.length > 1 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-neutral-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden">
          {isLoading ? (
            <li className="p-3 text-neutral-900 text-sm text-center animate-pulse">
              Carregando cidades...
            </li>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={`${city.uf}-${city.name}-${index}`}
                onClick={() => {
                  onChange(city);
                  setQuery(city.displayName);
                  setIsOpen(false);
                }}
                className="p-3 text-sm text-neutral-900 hover:opacity-50 cursor-pointer transition-colors"
              >
                <span className="font-medium">{city.name}</span>
                <span className="ml-1">- {city.uf}</span>
              </li>
            ))
          ) : (
            <li className="p-3 text-neutral-500 text-sm text-center">
              Nenhuma cidade encontrada.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
