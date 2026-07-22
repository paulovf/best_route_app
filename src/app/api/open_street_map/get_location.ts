import { NominatimReverseResponse } from "@/types/openStreetMap";

/**
 * Get a city location by coords in Open Street map external api.
 *
 * @param lat - city lat for search.
 * @param lon - city lon for search.
 * @returns a city location by cords.
 * @throws Error in get city localtion by cords.
 */
export async function getByCoords(
  lat: number,
  lon: number,
): Promise<NominatimReverseResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_OPEN_STREET_MAP_URL}`;
  const path = `?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

  const response = await fetch(`${apiUrl}${path}`, {
    method: "GET",
    headers: { "Accept-Language": "pt-BR" },
  });

  if (!response.ok) {
    throw new Error("Error during search geolocation on external api.");
  }

  return response.json();
}
