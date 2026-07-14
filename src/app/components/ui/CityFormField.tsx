"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useCity } from "@/context/CityContext";
import { CityAutocompleteProps } from "@/types/ibge";
import { CityOption } from "@/types/ibge";

export function CityFormField({
  placeholder,
  namePrefix,
  value,
  onChange,
}: CityAutocompleteProps) {
  const { cities, isLoadingCities } = useCity();
  const [query, setQuery] = useState(value ? value.displayName : "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const filteredCities = filterCities(query, cities);

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
          {isLoadingCities ? (
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
                className="p-3 text-sm text-neutral-900 font-medium hover:font-semibold cursor-pointer transition-colors flex flex-row gap-x-1 justify-start items-center"
              >
                <span>{city.name}</span>
                <span>- {city.uf}</span>
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

function filterCities(query: string, cities: CityOption[]) {
  if (query === "") {
    return [];
  } else {
    return cities
      .filter((city) => {
        const normalize = (str: string) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        return normalize(city.displayName).includes(normalize(query));
      })
      .slice(0, 10);
  }
}
