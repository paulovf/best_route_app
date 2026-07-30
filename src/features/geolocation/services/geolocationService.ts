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
  const queryParams = new URLSearchParams(formatPayload(payload)).toString();

  const response = await fetch(`${url}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

function formatPayload(
  payload: GeolocationApiRequest,
): Array<[string, string]> {
  return Object.entries(payload).map(([key, value]) => [key, String(value)]);
}
