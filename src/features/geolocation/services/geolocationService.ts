import {
  GeolocationApiRequest,
  GeolocationApiResponse,
  GeolocationApiFail,
} from "@/features/geolocation/types";

/**
 * Get a city location by coords in IBGE external api.
 *
 * @param payload - The incoming HTTP request containing lat and lon search params.
 * @returns a city location by cords.
 */
export async function getByCoords(
  payload: GeolocationApiRequest,
): Promise<GeolocationApiResponse> {
  const url = "/api/geolocation/get_by_coords";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorData: GeolocationApiFail;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        status: response.status,
        error: response.statusText,
      };
    }

    throw errorData;
  }

  return response.json();
}
