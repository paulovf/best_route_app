import { getByCoords } from "../../../api/open_street_map/get_location";
import { mockSuccessResponse } from "@/mocks/openStreetMapMock";

global.fetch = jest.fn();

describe("getByCoords Service", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_OPEN_STREET_MAP_URL: "https://api.test.com",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should successfully fetch geolocation data when the API returns 200 OK", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse,
    });

    const lat = -21.318334;
    const lon = -43.746666;

    const result = await getByCoords(lat, lon);

    expect(result).toEqual(mockSuccessResponse);
    expect(result.address.municipality).toBe("Antônio Carlos");

    expect(fetch).toHaveBeenCalledWith(
      `https://api.test.com?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      expect.any(Object),
    );
  });

  it("should throw an error when the external API returns a non-OK status", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getByCoords(0, 0)).rejects.toThrow(
      "Error during search geolocation on external api.",
    );
  });
});
