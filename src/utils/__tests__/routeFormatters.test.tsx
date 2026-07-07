import { render } from "@testing-library/react";
import {
  getTransportIcon,
  getTransportTypeLabel,
  getLocationIcon,
  formatDuration,
  formatPrice,
} from "../routeFormatters";

describe("routeFormatters Utility Functions", () => {
  describe("getTransportIcon", () => {
    it("should return a valid React component for a known transport type", () => {
      const { container } = render(getTransportIcon("bus"));
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("should fall back to the default car icon when an unknown transport type is provided", () => {
      // @ts-expect-error - testing invalid runtime value intentionally
      const { container } = render(getTransportIcon("spaceship"));
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("should forward custom className properties to the rendered icon element", () => {
      const { container } = render(
        getTransportIcon("plane", "w-10 h-10 custom-class"),
      );
      expect(container.querySelector("svg")).toHaveClass(
        "w-10",
        "h-10",
        "custom-class",
      );
    });
  });

  describe("getTransportTypeLabel", () => {
    it("should return the correct Portuguese translation for known transport types", () => {
      expect(getTransportTypeLabel("bus")).toBe("Ônibus");
      expect(getTransportTypeLabel("plane")).toBe("Aéreo");
      expect(getTransportTypeLabel("app_mobile")).toBe("App de mobilidade");
    });

    it('should return the fallback label "Carro" when given an unmapped type string', () => {
      // @ts-expect-error - testing invalid runtime value intentionally
      expect(getTransportTypeLabel("teleport")).toBe("Carro");
    });
  });

  describe("getLocationIcon", () => {
    it("should match the corresponding icon based on the specific location node type", () => {
      const { container } = render(getLocationIcon("home"));
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("should fallback to the MapPin icon for street types or generic unmapped contexts", () => {
      // @ts-expect-error - testing invalid runtime value intentionally
      const { container } = render(getLocationIcon("unknown_location"));
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("formatDuration", () => {
    it("should format clean integers straight into hours only", () => {
      expect(formatDuration(3)).toBe("3h");
      expect(formatDuration(24)).toBe("24h");
    });

    it("should format sub-hour values directly into minutes only", () => {
      expect(formatDuration(0.5)).toBe("30m");
      expect(formatDuration(0.75)).toBe("45m");
    });

    it("should seamlessly combine hours and minutes when both remain non-zero", () => {
      expect(formatDuration(2.5)).toBe("2h 30m");
      expect(formatDuration(1.25)).toBe("1h 15m");
    });

    it("should properly apply rounding mechanics when calculations result in floating fractions", () => {
      expect(formatDuration(4.1667)).toBe("4h 10m");
    });
  });

  describe("formatPrice", () => {
    it("should properly format decimal numbers into BRL currency structure formatting standards", () => {
      const formattedPrice = formatPrice(1500.5);
      expect(formattedPrice).toMatch(/R\$\s*1\.500,50/);
    });

    it("should format zero amounts correctly", () => {
      const formattedPrice = formatPrice(0);
      expect(formattedPrice).toMatch(/R\$\s*0,00/);
    });
  });
});
