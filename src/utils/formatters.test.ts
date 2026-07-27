import {
  getTransportTypeLabel,
  formatDuration,
  formatPrice,
} from "@/utils/formatters";

const tTransport = (key: string) => {
  const translations: Record<string, string> = {
    bus: "Ônibus",
    plane: "Aéreo",
    app_mobile: "App de mobilidade",
    car: "Carro",
  };

  return translations[key] ?? "Carro";
};

describe("getTransportTypeLabel", () => {
  it("should return the correct Portuguese translation for known transport types", () => {
    expect(getTransportTypeLabel("bus", tTransport)).toBe("Ônibus");
    expect(getTransportTypeLabel("plane", tTransport)).toBe("Aéreo");
    expect(getTransportTypeLabel("app_mobile", tTransport)).toBe(
      "App de mobilidade",
    );
  });

  it('should return the fallback label "Carro" when given an unmapped type string', () => {
    expect(getTransportTypeLabel("teleport", tTransport)).toBe("Carro");
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
