"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useCity } from "@/context/CityContext";
import { CityFormFieldProps, CityOption } from "@/types/form";
import { useTranslations } from "next-intl";

export function CityFormField({
  placeholder,
  namePrefix,
  value,
  onChange,
  error,
}: CityFormFieldProps) {
  const { cities, isLoadingCities } = useCity();
  const [query, setQuery] = useState(value ? value.displayName : "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const isDeleting = useRef(false);
  const t = useTranslations("CityFormField");

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    setQuery(value ? value.displayName : "");
  }, [value]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    isDeleting.current = newValue.length < query.length;

    setQuery(newValue);

    if (!isDeleting.current && cities && cities.length > 0) {
      const normalizedQuery = normalize(newValue);

      const exactDisplayMatch = cities.find(
        (city) => normalize(city.displayName) === normalizedQuery,
      );

      if (exactDisplayMatch) {
        if (!value || value.displayName !== exactDisplayMatch.displayName) {
          isInternalChange.current = true;
          onChange(exactDisplayMatch);
          setIsOpen(false);
        }
        return;
      }

      const nameMatches = cities.filter(
        (city) => normalize(city.name) === normalizedQuery,
      );

      if (nameMatches.length === 1) {
        const uniqueMatch = nameMatches[0];
        if (!value || value.displayName !== uniqueMatch.displayName) {
          isInternalChange.current = true;
          setQuery(uniqueMatch.displayName);
          onChange(uniqueMatch);
          setIsOpen(false);
        }
        return;
      }
    }

    isInternalChange.current = true;
    onChange(null);
    setIsOpen(true);
  };

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
          name={namePrefix}
          type="text"
          className={`w-full h-12 pl-11 pr-4 rounded-2xl border bg-white text-sm text-neutral-900 focus-primary focus:border-neutral-900 transition placeholder-slate-400 focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-400"
          }`}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
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

      {error && (
        <span className="text-xs text-red-500 mt-1.5 block pl-1 font-medium animate-in fade-in duration-200">
          {error}
        </span>
      )}

      {isOpen && query.length > 1 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-neutral-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden">
          {isLoadingCities ? (
            <li className="p-3 text-neutral-900 text-sm text-center animate-pulse">
              {t("loading")}
            </li>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={`${city.uf}-${city.name}-${index}`}
                onClick={() => {
                  isInternalChange.current = true;
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
              {t("notFound")}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function filterCities(query: string, cities: CityOption[]) {
  if (query === "") return [];
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
