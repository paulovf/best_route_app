import { renderHook } from "@testing-library/react";
import { useResultLink } from "@/features/routing/hooks/useResultLink";
import { useRoute } from "@/features/routing/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { RouteContextType } from "@/types/contexts";

jest.mock("/src/features/routing/context/RouteContext");
jest.mock("/scr/hooks/useIsMounted");

describe("useResultLink Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return default link (/#form-screen) when not mounted", () => {
    jest.mocked(useIsMounted).mockReturnValue(false);
    jest.mocked(useRoute).mockReturnValue({
      routeData: null,
      errorData: null,
    } as RouteContextType);

    const { result } = renderHook(() => useResultLink());
    expect(result.current).toBe("/#form-screen");
  });

  it("should return default link (/#form-screen) when mounted but no data exists", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      routeData: null,
      errorData: null,
    } as RouteContextType);

    const { result } = renderHook(() => useResultLink());
    expect(result.current).toBe("/#form-screen");
  });

  it("should return success link (/result/success) when route options exist", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      routeData: { options: [{ id: "1" }] },
      errorData: null,
    } as unknown as RouteContextType);

    const { result } = renderHook(() => useResultLink());
    expect(result.current).toBe("/result/success");
  });

  it("should return fail link (/result/fail) when there is an error", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      routeData: null,
      errorData: { message: "Error API" },
    } as RouteContextType);

    const { result } = renderHook(() => useResultLink());
    expect(result.current).toBe("/result/fail");
  });
});
