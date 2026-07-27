import { CitySearchRouteApiResponse } from "@/types/citySearch";

/**
 * Call a internal api for search new route.
 *
 * @param payload - post form to send a external api.
 * @returns a internal api response with nre routes
 * @throws Error when internal api return error.
 */
export async function getCites(): Promise<CitySearchRouteApiResponse> {
  const url = "/api/ibge/search_cities";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData: Array<unknown> = [];

    throw errorData;
  }

  return response.json();
}
