import React from "react";
import {
  Bus,
  Plane,
  Car,
  Ship,
  Train,
  Smartphone,
  MapPin,
  Home,
  Anchor,
} from "lucide-react";
import { TransportType, LocationType } from "@/types/route";

/**
 * Get icon for display transport type in Step component.
 *
 * @param type - transport type.
 * @param className - custom class.
 * @returns a corrected icon for transport type.
 */
export const getTransportIcon = (
  type: TransportType,
  className = "w-4 h-4",
) => {
  switch (type) {
    case "bus":
      return <Bus className={className} />;
    case "plane":
      return <Plane className={className} />;
    case "car":
      return <Car className={className} />;
    case "boat":
      return <Ship className={className} />;
    case "train":
      return <Train className={className} />;
    case "app_mobile":
      return <Smartphone className={className} />;
    default:
      return <Car className={className} />;
  }
};

/**
 * Get transport label for display in Step component.
 *
 * @param type - transport type.
 * @param t - intl key for display transport label by selected language.
 * @returns a translated transport label by transport type.
 */
export const getTransportTypeLabel = (
  type: TransportType,
  t: (key: string) => string,
) => {
  switch (type) {
    case "bus":
      return t("bus");
    case "plane":
      return t("plane");
    case "car":
      return t("car");
    case "boat":
      return t("boat");
    case "train":
      return t("train");
    case "app_mobile":
      return t("app_mobile");
    default:
      return t("default");
  }
};

/**
 * Get icon for display location type in Step component.
 *
 * @param type - location type.
 * @param className - custom class.
 * @returns a corrected icon for location type.
 */
export const getLocationIcon = (type: LocationType, className = "w-4 h-4") => {
  switch (type) {
    case "airport":
      return <Plane className={className} />;
    case "bus_station":
      return <Bus className={className} />;
    case "train_station":
      return <Train className={className} />;
    case "boat_station":
      return <Anchor className={className} />;
    case "home":
      return <Home className={className} />;
    case "street":
    default:
      return <MapPin className={className} />;
  }
};

/**
 * Format a time travel to display in OptionCard and Step components
 *
 * @param decimalHours - a decimal travel time
 * @returns a travel time formatted (e.g.: '02h 30m')
 */
export const formatDuration = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

/**
 * Format a travel amount to display in OptionCard and Step components
 *
 * @param value - amount valur
 * @param locale - currency locale
 * @returns a travel amount formatted (e.g.: R$ 1,00)
 */
export const formatPrice = (
  value: number,
  locale: string = "pt-BR",
): string => {
  return value.toLocaleString(locale, { style: "currency", currency: "BRL" });
};
