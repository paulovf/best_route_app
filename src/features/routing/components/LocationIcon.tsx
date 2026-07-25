import React from "react";
import { Bus, Plane, Anchor, Home, Train, MapPin } from "lucide-react";
import { LocationType } from "@/types/route";

interface LocationIconProps {
  type: LocationType;
  className?: string;
}

/**
 * Get icon for display location type in Step component.
 *
 * @param type - location type.
 * @param className - custom class.
 * @returns a corrected icon for location type.
 */
export const getLocationIcon = ({
  type,
  className = "w-4 h-4",
}: LocationIconProps) => {
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
