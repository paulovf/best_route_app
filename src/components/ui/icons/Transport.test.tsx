import { render } from "@testing-library/react";
import { TransportIcon } from "@/components/ui/icons/Transport";

describe("getTransportIcon", () => {
  it("should return a valid React component for a known transport type", () => {
    const { container } = render(TransportIcon({ type: "bus" }));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should fall back to the default car icon when an unknown transport type is provided", () => {
    // @ts-expect-error: Allow for test use case
    const { container } = render(TransportIcon({ type: "spaceship" }));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should forward custom className properties to the rendered icon element", () => {
    const { container } = render(
      TransportIcon({ type: "plane", className: "w-10 h-10 custom-class" }),
    );
    expect(container.querySelector("svg")).toHaveClass(
      "w-10",
      "h-10",
      "custom-class",
    );
  });
});
