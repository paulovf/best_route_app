import { RouteApiRequest } from "@/types/route";
import { RouteApiResponse } from "@/types/route";
import { Fail } from "@/types/fail";

export async function searchRoute(
  payload: RouteApiRequest,
): Promise<RouteApiResponse> {
  const url = "/api/search";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorData: Fail;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        status: response.status,
        error: response.statusText,
        message: "Unexpected server error with no response body.",
        path: url,
      };
    }

    throw errorData;
  }

  return response.json();
}
