import { renderHook, waitFor } from "@testing-library/react";
import { useGeolocation } from "../useGeolocation";
import { getByCoords } from "@/app/api/open_street_map/get_location";

jest.mock("/src/app/[locale]/api/open_street_map/get_location");

describe("useGeolocation Hook", () => {
  const mockGetCurrentPosition = jest.fn();

  beforeAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: mockGetCurrentPosition,
      },
      writable: true,
      configurable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCurrentPosition.mockReset();
  });

  it("should return city and uf on a successful geolocation search", async () => {
    (getByCoords as jest.Mock).mockResolvedValueOnce({
      address: {
        municipality: "Vitória",
        "ISO3166-2-lvl4": "BR-ES",
      },
    });

    mockGetCurrentPosition.mockImplementationOnce((successCallback) =>
      successCallback({
        coords: { latitude: -19.9167, longitude: -43.9345 },
      }),
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.location).toEqual({
        city: "Vitória",
        uf: "ES",
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should return an error when geolocation is not supported by the browser", async () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Geolocation is not supported by your browser.",
      );
    });

    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);

    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition: mockGetCurrentPosition },
      configurable: true,
    });
  });

  it("should return an error when the user denies geolocation permission", async () => {
    mockGetCurrentPosition.mockImplementationOnce((_, errorCallback) =>
      errorCallback({
        code: 1,
        message: "User denied Geolocation",
      }),
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Geolocation permission denied by the user.",
      );
    });

    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should return an error when the API response misses both city and state info", async () => {
    (getByCoords as jest.Mock).mockResolvedValueOnce({
      address: {
        country: "Brasil",
      },
    });

    mockGetCurrentPosition.mockImplementationOnce((successCallback) =>
      successCallback({
        coords: { latitude: 0, longitude: 0 },
      }),
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "City or state could not be found in the response.",
      );
    });

    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should turn loading off and log error when the getByCoords service fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (getByCoords as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error"),
    );

    mockGetCurrentPosition.mockImplementationOnce((successCallback) =>
      successCallback({
        coords: { latitude: 0, longitude: 0 },
      }),
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch city from coordinates.",
      expect.any(Error),
    );
    expect(result.current.location).toBeNull();

    consoleSpy.mockRestore();
  });
});
