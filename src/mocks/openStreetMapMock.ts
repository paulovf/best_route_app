import { NominatimReverseResponse } from "@/types/openStreetMap";

export const mockSuccessResponse: NominatimReverseResponse = {
  place_id: 9861328,
  licence:
    "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  osm_type: "relation",
  osm_id: 315163,
  lat: "-21.3183340",
  lon: "-43.7466660",
  class: "boundary",
  type: "administrative",
  place_rank: 16,
  importance: 0.5541599744972721,
  addresstype: "municipality",
  name: "Antônio Carlos",
  display_name:
    "Antônio Carlos, Minas Gerais, Região Sudeste, 36220-000, Brasil",
  address: {
    municipality: "Antônio Carlos",
    state: "Minas Gerais",
    "ISO3166-2-lvl4": "BR-MG",
    region: "Região Sudeste",
    postcode: "36220-000",
    country: "Brasil",
    country_code: "br",
  },
  boundingbox: ["-21.5863040", "-21.2702402", "-43.8911490", "-43.6310470"],
};
