import { renderHook, waitFor } from "@testing-library/react";
import { useIsMounted } from "../useIsMounted";

describe("useIsMounted hook", () => {
  it("should set to true after mounting", async () => {
    const { result } = renderHook(() => useIsMounted());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
