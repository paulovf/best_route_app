import { searchRoute } from "../routeService";
import { RouteApiRequest } from "@/types/route";

describe("routeService - searchRoute", () => {
  const mockPayload: RouteApiRequest = {
    origin_city: "Belo Horizonte",
    origin_state: "MG",
    destination_city: "Vitória",
    destination_state: "ES",
    travel_date: "2026-12-25T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return route data successfully on 200 OK", async () => {
    const mockApiResponse = {
      origin_city: "Belo Horizonte",
      destination_city: "Vitória",
      options: [],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const result = await searchRoute(mockPayload);

    expect(result).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockPayload),
    });
  });

  it("should throw parsed error when API fails with a valid JSON payload", async () => {
    const mockApiError = {
      status: 400,
      error: "Bad Request",
      message: "Unable to generate a valid itinerary",
      path: "/api/search",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: jest.fn().mockResolvedValue(mockApiError),
    });

    await expect(searchRoute(mockPayload)).rejects.toEqual(mockApiError);
  });

  it("should throw fallback custom error when API fails and JSON parsing crashes (e.g., 502 HTML page)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      json: jest
        .fn()
        .mockRejectedValue(new Error("Unexpected token < in JSON")),
    });

    await expect(searchRoute(mockPayload)).rejects.toEqual({
      status: 502,
      error: "Bad Gateway",
      message: "Unexpected server error with no response body.",
      path: "/api/search",
    });
  });
});
