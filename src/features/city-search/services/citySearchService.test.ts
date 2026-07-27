import { getCites } from "@/features/city-search/services/citySearchService";
import { CitySearchRouteApiResponse } from "@/types/citySearch";

describe("routeService - getCites", () => {
  const mockApiResponse: CitySearchRouteApiResponse = {
    list: [
      { name: "Belo Horizonte", uf: "MG", displayName: "Belo Horizonte - MG" },
      { name: "Vitória", uf: "ES", displayName: "Vitória - ES" },
    ],
  };

  it("should return route data successfully on 200 OK", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const result = await getCites();

    expect(result).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith("/api/ibge/search_cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should throw empty list when API fails and JSON parsing crashes (e.g., 502 HTML page)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      json: jest.fn().mockRejectedValue(new Error("Unexpected error")),
    });

    await expect(getCites()).rejects.toEqual([]);
  });
});
