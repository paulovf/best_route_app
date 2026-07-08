import React from "react";
import { renderHook, act } from "@testing-library/react";
import { RouteProvider, useRoute } from "../RouteContext";
import { RouteApiResponse } from "@/types/route";
import { Fail } from "@/types/fail";

describe("RouteContext & useRoute", () => {
  const mockRouteData: RouteApiResponse = {
    id: "123",
    origin_city: "Belo Horizonte",
    origin_state: "MG",
    destination_city: "Vitória",
    destination_state: "ES",
    travel_date: "2026-12-25T00:00:00.000Z",
    options: [],
  };

  const mockErrorData: Fail = {
    status: 400,
    error: "Bad Request",
    message: "Unable to generate a valid itinerary",
    path: "/api/search",
  };

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RouteProvider>{children}</RouteProvider>
  );

  it("should initialize with null states when sessionStorage is empty", () => {
    const { result } = renderHook(() => useRoute(), { wrapper });

    expect(result.current.routeData).toBeNull();
    expect(result.current.errorData).toBeNull();
  });

  it("should initialize with saved data from sessionStorage if present", () => {
    sessionStorage.setItem("best_route_data", JSON.stringify(mockRouteData));
    sessionStorage.setItem("best_route_error", JSON.stringify(mockErrorData));

    const { result } = renderHook(() => useRoute(), { wrapper });

    expect(result.current.routeData).toEqual(mockRouteData);
    expect(result.current.errorData).toEqual(mockErrorData);
  });

  it("should update routeData and clear errorData when setRouteData is called", () => {
    const { result } = renderHook(() => useRoute(), { wrapper });

    act(() => {
      result.current.setErrorData(mockErrorData);
    });

    act(() => {
      result.current.setRouteData(mockRouteData);
    });

    expect(result.current.routeData).toEqual(mockRouteData);
    expect(result.current.errorData).toBeNull();

    expect(sessionStorage.getItem("best_route_data")).toBe(
      JSON.stringify(mockRouteData),
    );
    expect(sessionStorage.getItem("best_route_error")).toBeNull();
  });

  it("should update errorData and clear routeData when setErrorData is called", () => {
    const { result } = renderHook(() => useRoute(), { wrapper });

    act(() => {
      result.current.setRouteData(mockRouteData);
    });

    act(() => {
      result.current.setErrorData(mockErrorData);
    });

    expect(result.current.errorData).toEqual(mockErrorData);
    expect(result.current.routeData).toBeNull();

    expect(sessionStorage.getItem("best_route_error")).toBe(
      JSON.stringify(mockErrorData),
    );
    expect(sessionStorage.getItem("best_route_data")).toBeNull();
  });

  it("should clear all data from state and sessionStorage when clearStorage is called", () => {
    const { result } = renderHook(() => useRoute(), { wrapper });

    act(() => {
      result.current.setRouteData(mockRouteData);
    });

    act(() => {
      result.current.clearStorage();
    });

    expect(result.current.routeData).toBeNull();
    expect(result.current.errorData).toBeNull();
    expect(sessionStorage.getItem("best_route_data")).toBeNull();
    expect(sessionStorage.getItem("best_route_error")).toBeNull();
  });

  it("should throw an error if useRoute is used outside of a RouteProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useRoute())).toThrow(
      "useRoute must be used into RouteProvider",
    );

    consoleSpy.mockRestore();
  });
});
