// src/utils/routeFormatters.tsx
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

export const getTransportTypeLabel = (type: TransportType) => {
  switch (type) {
    case "bus":
      return "Ônibus";
    case "plane":
      return "Aéreo";
    case "car":
      return "Carro próprio";
    case "boat":
      return "Barco";
    case "train":
      return "Trem";
    case "app_mobile":
      return "App de mobilidade";
    default:
      return "Carro";
  }
};

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

export const formatDuration = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

export const formatPrice = (value: number): string => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
