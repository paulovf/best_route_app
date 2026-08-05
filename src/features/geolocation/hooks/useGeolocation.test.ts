import { renderHook, waitFor } from "@testing-library/react";
import { useGeolocation } from "./useGeolocation";
import { getByCoords } from "@/features/geolocation/services/geolocationService";
import { NominatimReverseResponse } from "@/features/geolocation/types";

jest.mock("/src/features/geolocation/services/geolocationService", () => ({
  getByCoords: jest.fn(),
}));

const mockGetByCoords = getByCoords as jest.MockedFunction<typeof getByCoords>;

describe("useGeolocation", () => {
  let originalGeolocation: Geolocation;

  beforeAll(() => {
    originalGeolocation = navigator.geolocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(navigator, "geolocation", {
      value: originalGeolocation,
      writable: true,
      configurable: true,
    });
  });

  it("should set an error if geolocation is not supported by the browser", async () => {
    Object.defineProperty(navigator, "geolocation", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Geolocation is not supported by your browser.",
      );
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toBeNull();
  });

  it("should set an error if geolocation permission is denied by the user", async () => {
    const mockGetCurrentPosition = jest.fn((_, errorCallback) => {
      errorCallback({
        code: 1,
        message: "User denied Geolocation",
      });
    });

    Object.defineProperty(navigator, "geolocation", {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Geolocation permission denied by the user.",
      );
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toBeNull();
  });

  it("should successfully set location when geolocation succeeds and address data is valid", async () => {
    const mockGetCurrentPosition = jest.fn((successCallback) => {
      successCallback({
        coords: {
          latitude: -23.5505,
          longitude: -46.6333,
        },
      });
    });

    Object.defineProperty(navigator, "geolocation", {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
      configurable: true,
    });

    mockGetByCoords.mockResolvedValueOnce({
      address: {
        city: "São Paulo",
        "ISO3166-2-lvl4": "BR-SP",
      },
    } as NominatimReverseResponse);

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.location).toEqual({
        city: "São Paulo",
        uf: "SP",
      });
    });

    expect(mockGetByCoords).toHaveBeenCalledWith({
      latitude: -23.5505,
      longitude: -46.6333,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set error when city or state cannot be extracted from address response", async () => {
    const mockGetCurrentPosition = jest.fn((successCallback) => {
      successCallback({
        coords: { latitude: 0, longitude: 0 },
      });
    });

    Object.defineProperty(navigator, "geolocation", {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
      configurable: true,
    });

    mockGetByCoords.mockResolvedValueOnce({
      address: {},
    } as NominatimReverseResponse);

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.error).toBe(
        "City or state could not be found in the response.",
      );
    });

    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle error when getByCoords service fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const mockGetCurrentPosition = jest.fn((successCallback) => {
      successCallback({
        coords: { latitude: -23.5505, longitude: -46.6333 },
      });
    });

    Object.defineProperty(navigator, "geolocation", {
      value: { getCurrentPosition: mockGetCurrentPosition },
      writable: true,
      configurable: true,
    });

    mockGetByCoords.mockRejectedValueOnce(new Error("API failure"));

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch city from coordinates.",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
