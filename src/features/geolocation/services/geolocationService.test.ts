import { getByCoords } from "./geolocationService"; // Ajuste o caminho se necessário
import {
  GeolocationApiRequest,
  NominatimReverseResponse,
} from "@/features/geolocation/types";

describe("geolocationService - getByCoords", () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  const mockApiResponse: NominatimReverseResponse = {
    address: {
      municipality: "Belo Horizonte",
      state: "MG",
      region: "Southeast",
      postcode: "30130-000",
      country: "Brazil",
      country_code: "br",
    },
    place_id: 0,
    licence: "",
    osm_type: "",
    osm_id: 0,
    lat: "",
    lon: "",
    class: "",
    type: "",
    place_rank: 0,
    importance: 0,
    addresstype: "",
    name: "",
    display_name: "",
    boundingbox: [],
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
    const url = `/api/open_street_map/get_location?latitude=${payload.latitude}&longitude=${payload.longitude}`;

    expect(result).toEqual(mockApiResponse);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
