export interface NominatimAddress {
  municipality: string;
  /** Location state. */
  state: string;
  /** Location city with lvl4 display format, if exists. */
  "ISO3166-2-lvl4"?: string;
  /** Location city with defalut format, if exists. */
  "ISO3166-2"?: string;
  /** Location city region. */
  region: string;
  /** Location city postcode (CEP). */
  postcode: string;
  /** Location city country. */
  country: string;
  /** Location city country code. */
  country_code: string;
  /** Location city name. */
  city?: string;
  /** Location city town, if exists. */
  town?: string;
  /** Location city village, if exists. */
  village?: string;
}

export interface NominatimReverseResponse {
  /** Location city place ID. */
  place_id: number;
  /** Location licence. */
  licence: string;
  /** Location OSM type. */
  osm_type: string;
  /** Location oSM ID. */
  osm_id: number;
  /** Location lat. */
  lat: string;
  /** Location lon. */
  lon: string;
  /** Location class. */
  class: string;
  /** Location type. */
  type: string;
  /** Location place rank. */
  place_rank: number;
  /** Location importance. */
  importance: number;
  /** Location address type. */
  addresstype: string;
  /** Location city name. */
  name: string;
  /** Location city display name. */
  display_name: string;
  /** Location nominatim address. */
  address: NominatimAddress;
  /** Location boundingbox. */
  boundingbox: string[];
}

export interface LocationData {
  /** City name. */
  city: string;
  /** State name. */
  uf: string;
}
