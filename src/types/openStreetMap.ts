export interface NominatimAddress {
  municipality: string;
  state: string;
  "ISO3166-2-lvl4"?: string;
  "ISO3166-2"?: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
  city?: string;
  town?: string;
  village?: string;
}

export interface NominatimReverseResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: string[];
}

export interface LocationData {
  city: string;
  uf: string;
}
