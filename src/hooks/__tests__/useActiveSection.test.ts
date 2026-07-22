import { renderHook, act } from "@testing-library/react";
import { useActiveSection } from "../useActiveSection";

describe("useActiveSection hook", () => {
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();
  let intersectionCallback: (
    entries: Partial<IntersectionObserverEntry>[],
  ) => void;

  beforeEach(() => {
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        unobserve: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    document.body.innerHTML = "";
  });

  it("should return null initially and start observing elements that exist in DOM", () => {
    const section1 = document.createElement("div");
    section1.id = "home";
    const section2 = document.createElement("div");
    section2.id = "about";
    document.body.appendChild(section1);
    document.body.appendChild(section2);

    const { result } = renderHook(() => useActiveSection(["home", "about"]));

    expect(result.current).toBeNull();

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.6 },
    );

    expect(mockObserve).toHaveBeenCalledWith(section1);
    expect(mockObserve).toHaveBeenCalledWith(section2);
  });

  it("should update the active section id when an element intersects", () => {
    const section1 = document.createElement("div");
    section1.id = "home";
    document.body.appendChild(section1);

    const { result } = renderHook(() => useActiveSection(["home"]));

    act(() => {
      intersectionCallback([
        {
          isIntersecting: true,
          target: section1,
        },
      ]);
    });

    expect(result.current).toBe("home");
  });

  it("should not update the active section if the element is not intersecting", () => {
    const section1 = document.createElement("div");
    section1.id = "home";
    document.body.appendChild(section1);

    const { result } = renderHook(() => useActiveSection(["home"]));

    act(() => {
      intersectionCallback([
        {
          isIntersecting: false,
          target: section1,
        },
      ]);
    });

    expect(result.current).toBeNull();
  });

  it("should clean up and disconnect the observer when unmounted", () => {
    const { unmount } = renderHook(() => useActiveSection(["home"]));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
