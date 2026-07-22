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
  /** Step transport type. */
  transport_type: TransportType;
  /** Step distance in kilometers. */
  kilometers: number;
  /** Step average amount. */
  average_amount: number;
  /** Step origin city name. */
  origin_city: string;
  /** Step origin state name. */
  origin_state: string;
  /** Step origin_departure name. */
  origin_departure: string;
  /** Step origin departure type. */
  origin_departure_type: LocationType;
  /** Step destination city name. */
  destination_city: string;
  /** Step destination state name. */
  destination_state: string;
  /** Step destination arrival name. */
  destination_arrival: string;
  /** Step destination arrival type. */
  destination_arrival_type: LocationType;
  /** Step position. */
  order: number;
  /** Step duration in decimal hours. */
  duration_hours: number;
}

export interface Option {
  /** Route total kilometers in decimal. */
  total_kilometers: number;
  /** Route totaal amount. */
  total_amount: number;
  /** Route steps list. */
  steps: Step[];
  /** Route position. */
  order: number;
  /** Route description. */
  description: string;
  /** Route duration hours. */
  total_duration_hours: number;
  /** Route highlight. */
  highlight: HighlightType;
}

export interface RouteApiRequest {
  /** Origin city name. */
  origin_city: string;
  /** Origin state name. */
  origin_state: string;
  /** Destination city name. */
  destination_city: string;
  /** Destination state name. */
  destination_state: string;
  /** Travel date. */
  travel_date: string;
}

export interface RouteApiResponse {
  /** Route Api Response ID. */
  id: string;
  /** Route Api Response origin city name. */
  origin_city: string;
  /** Route Api Response origin state name. */
  origin_state: string;
  /** Route Api Response destination city. */
  destination_city: string;
  /** Route Api Response destination state name. */
  destination_state: string;
  /** Route Api Response travel date. */
  travel_date: string;
  /** Route Api Response list routes. */
  options: Option[];
}
