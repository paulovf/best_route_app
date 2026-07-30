import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { CityProvider, useCity } from "./CityContext";
import { getCites } from "@/features/city-search/services/citySearchService";
import { CitySearchRouteApiResponse } from "@/features/city-search/types";

jest.mock("/src/features/city-search/services/citySearchService", () => ({
  getCites: jest.fn(),
}));

const mockGetCites = getCites as jest.MockedFunction<typeof getCites>;

describe("CityContext & CityProvider", () => {
  const mockApiResponse: CitySearchRouteApiResponse = {
    list: [
      { name: "São Paulo", uf: "SP", displayName: "São Paulo - SP" },
      { name: "Rio de Janeiro", uf: "RJ", displayName: "Rio de Janeiro - RJ" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CityProvider>{children}</CityProvider>
  );

  it("should throw an error if useCity is used outside of CityProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useCity())).toThrow(
      "useCity must be used within a CityProvider",
    );

    consoleSpy.mockRestore();
  });

  it("should load cities from sessionStorage on initial state if they already exist", () => {
    const savedCities = [
      { name: "Belo Horizonte", uf: "MG", displayName: "Belo Horizonte - MG" },
    ];
    sessionStorage.setItem("best_route_cities", JSON.stringify(savedCities));

    const { result } = renderHook(() => useCity(), { wrapper });

    expect(result.current.cities).toEqual(savedCities);
    expect(result.current.isLoadingCities).toBe(false);
    expect(mockGetCites).not.toHaveBeenCalled();
  });

  it("should fetch cities from API when sessionStorage is empty and update state", async () => {
    mockGetCites.mockResolvedValueOnce(
      mockApiResponse as CitySearchRouteApiResponse,
    );

    const { result } = renderHook(() => useCity(), { wrapper });

    expect(result.current.isLoadingCities).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoadingCities).toBe(false);
    });

    expect(mockGetCites).toHaveBeenCalledTimes(1);
    expect(result.current.cities).toEqual(mockApiResponse.list);
  });

  it("should handle API call error and reset loading state", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockGetCites.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useCity(), { wrapper });

    expect(result.current.isLoadingCities).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoadingCities).toBe(false);
    });

    expect(result.current.cities).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch cities globally:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should allow updating cities manually using setCities function", async () => {
    mockGetCites.mockResolvedValueOnce({
      list: [],
    } as CitySearchRouteApiResponse);

    const { result } = renderHook(() => useCity(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoadingCities).toBe(false);
    });

    const newCities = [
      { name: "Curitiba", uf: "PR", displayName: "Curitiba - PR" },
    ];

    act(() => {
      result.current.setCities(newCities);
    });

    expect(result.current.cities).toEqual(newCities);
  });
});
