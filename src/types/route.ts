export type TransportType =
  "bus" | "plane" | "car" | "boat" | "train" | "app_mobile";
export type LocationType =
  | "airport"
  | "bus_station"
  | "train_station"
  | "boat_station"
  | "street"
  | "home";

export type HighlightType =
  "recommended" | "cheapest" | "fastest" | "most_convenient";

export interface Step {
  transport_type: TransportType;
  kilometers: number;
  average_amount: number;
  origin_city: string;
  origin_state: string;
  origin_departure: string;
  origin_departure_type: LocationType;
  destination_city: string;
  destination_state: string;
  destination_arrival: string;
  destination_arrival_type: LocationType;
  order: number;
  duration_hours: number;
}

export interface Option {
  total_kilometers: number;
  total_amount: number;
  steps: Step[];
  order: number;
  description: string;
  total_duration_hours: number;
  highlight: HighlightType;
}

export interface RouteApiRequest {
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  travel_date: string;
}

export interface RouteApiResponse {
  id: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  travel_date: string;
  options: Option[];
}
