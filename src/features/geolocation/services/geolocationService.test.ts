import { getByCoords } from "./geolocationService"; // Ajuste o caminho se necessário
import {
  GeolocationApiRequest,
  GeolocationApiResponse,
} from "@/features/geolocation/types";

describe("geolocationService - getByCoords", () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  const mockApiResponse: GeolocationApiResponse = {
    response: {
      municipality: "Belo Horizonte",
      state: "MG",
      region: "Southeast",
      postcode: "30130-000",
      country: "Brazil",
      country_code: "br",
    },
  };

  const payload: GeolocationApiRequest = {
    latitude: -19.9167,
    longitude: -43.9345,
  };

  it("should return city data successfully on 200 OK", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getByCoords(payload);

    expect(result).toEqual(mockApiResponse);
    expect(fetchMock).toHaveBeenCalledWith("/api/geolocation/get_by_coords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });

  it("should throw parsed JSON error data when API fails with a valid JSON response", async () => {
    const mockJsonError = { status: 400, error: "Invalid coordinates" };

    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => mockJsonError,
    });

    await expect(getByCoords(payload)).rejects.toEqual(mockJsonError);
  });

  it("should throw error message when API fails and JSON parsing crashes (e.g., 502 HTML page)", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      json: async () => {
        throw new Error("Unexpected token < in JSON at position 0");
      },
    });

    await expect(getByCoords(payload)).rejects.toEqual({
      status: 502,
      error: "Bad Gateway",
    });
  });
});
