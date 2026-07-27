export type TransportType =
  "bus" | "plane" | "car" | "boat" | "train" | "app_mobile";

export type LocationType =
  | "airport"
  | "bus_station"
  | "train_station"
  | "boat_station"
  | "street"
  | "home";

export interface LocationIconProps {
  /** Location type. */
  type: LocationType;
  /** Custom class. */
  className?: string;
}

export interface TransportIconProps {
  /** Transport type. */
  type: TransportType;
  /** Custom class. */
  className?: string;
}
