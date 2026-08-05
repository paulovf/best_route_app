import { GET } from "./route";
import { NominatimReverseResponse } from "@/features/geolocation/types";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => ({
      status: init?.status || 200,
      body,
    }),
  },
}));

describe("GET /api/open_street_map/get_location", () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_OPEN_STREET_MAP_URL = "https://mock-osm.com";
    fetchMock = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  const mockRequest = (url: string) => ({ url }) as Request;

  it("should return 400 error if 'lat' or 'lon' params are missing", async () => {
    const req = mockRequest("http://localhost/api/osm?latitude=-23.55");
    const response = (await GET(req)) as unknown as {
      status: number;
      body: NominatimReverseResponse;
    };

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "The 'lat' and 'lon' parameters are required.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should successfully call the OpenStreetMap API and return the location data", async () => {
    const mockOsmResponse = {
      address: { city: "São Paulo", state: "SP" },
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOsmResponse,
    });

    const req = mockRequest(
      "http://localhost/api/osm?latitude=-23.55&longitude=-46.63",
    );
    const response = (await GET(req)) as unknown as {
      status: number;
      body: NominatimReverseResponse;
    };

    expect(fetchMock).toHaveBeenCalledWith(
      "https://mock-osm.com?format=json&lat=-23.55&lon=-46.63&zoom=10&addressdetails=1",
      {
        method: "GET",
        headers: {
          "Accept-Language": "pt-BR",
          "User-Agent": "BestRouteApplication/0.1.0 (contact@bestroute.com)",
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOsmResponse);
  });

  it("should return 500 error if external OpenStreetMap API is not ok", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    const req = mockRequest(
      "http://localhost/api/osm?latitude=-23.55&longitude=-46.63",
    );
    const response = (await GET(req)) as unknown as {
      status: number;
      body: NominatimReverseResponse;
    };

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal error while fetching geolocation.",
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error in get city location by coords:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should return 500 error if fetch call throws an exception", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fetchMock.mockRejectedValueOnce(new Error("Network Error"));

    const req = mockRequest(
      "http://localhost/api/osm?latitude=-23.55&longitude=-46.63",
    );
    const response = (await GET(req)) as unknown as {
      status: number;
      body: NominatimReverseResponse;
    };

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal error while fetching geolocation.",
    });

    consoleSpy.mockRestore();
  });
});
