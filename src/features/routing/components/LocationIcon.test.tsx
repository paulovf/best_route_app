import { render } from "@testing-library/react";
import { getLocationIcon } from "./LocationIcon";
import { LocationType } from "@/types/route";

describe("getLocationIcon", () => {
  it("should match the corresponding icon based on the specific location node type", () => {
    const { container } = render(getLocationIcon({ type: "home" }));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should fallback to the MapPin icon for street types or generic unmapped contexts", () => {
    const { container } = render(
      getLocationIcon({ type: "unknown_location" as LocationType }),
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
