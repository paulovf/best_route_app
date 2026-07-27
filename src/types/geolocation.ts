import { NominatimAddress } from "./openStreetMap";

export interface GeolocationApiRequest {
  /** Latitude coordinate. */
  latitude: number;
  /** Longitude coordinate. */
  longitude: number;
}

export interface GeolocationApiResponse {
  /** IBGE city data. */
  response: NominatimAddress;
}

export interface GeolocationApiFail {
  /** Error message. */
  error: string;
  /** Error status code. */
  status: number;
}
