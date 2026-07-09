import { renderHook } from "@testing-library/react";
import { usePreventNavigation } from "../usePreventNavigation";

describe("usePreventNavigation hook", () => {
  const addSpy = jest.spyOn(window, "addEventListener");
  const removeSpy = jest.spyOn(window, "removeEventListener");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add 'beforeunload' listener when isBlocking is true", () => {
    renderHook(() => usePreventNavigation(true));

    expect(addSpy).toHaveBeenCalledWith("beforeunload", expect.any(Function));
  });

  it("should remove 'beforeunload' listener when component unmounts", () => {
    const { unmount } = renderHook(() => usePreventNavigation(true));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );
  });

  it("should not add listener when isBlocking is false", () => {
    renderHook(() => usePreventNavigation(false));

    expect(addSpy).not.toHaveBeenCalled();
  });
});
