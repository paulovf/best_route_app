import React from "react";
import { Bus, Plane, Car, Ship, Train, Smartphone } from "lucide-react";
import { TransportType } from "@/types/route";

interface TransportIconProps {
  type: TransportType;
  className?: string;
}

export const TransportIcon = ({ type, className = "w-4 h-4" }: TransportIconProps) => {
  switch (type) {
    case "bus": return <Bus className={className} />;
    case "plane": return <Plane className={className} />;
    case "boat": return <Ship className={className} />;
    case "train": return <Train className={className} />;
    case "app_mobile": return <Smartphone className={className} />;
    case "car":
    default: return <Car className={className} />;
  }
};
