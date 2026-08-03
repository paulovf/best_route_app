import { render } from "@testing-library/react";
import FaroProvider from "./FaroProvider";
import { initializeFaro } from "@grafana/faro-web-sdk";

jest.mock("@grafana/faro-web-sdk", () => ({
  initializeFaro: jest.fn(),
  getWebInstrumentations: jest.fn(() => []),
}));

jest.mock("@grafana/faro-react", () => ({
  ReactIntegration: jest.fn(),
}));

describe("FaroProvider Component", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    localStorage.clear();
    (initializeFaro as jest.Mock).mockClear();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should not initialize Faro if not in production environment", () => {
    process.env.NEXT_PUBLIC_ENVIRONMENT = "development";
    localStorage.setItem("cookie-consent", "granted");

    render(<FaroProvider />);
    expect(initializeFaro).not.toHaveBeenCalled();
  });

  it("should not initialize Faro if the user has not given consent", () => {
    process.env.NEXT_PUBLIC_ENVIRONMENT = "production";
    localStorage.setItem("cookie-consent", "denied");

    render(<FaroProvider />);
    expect(initializeFaro).not.toHaveBeenCalled();
  });

  it("should initialize Faro only once in production and with consent", () => {
    process.env.NEXT_PUBLIC_ENVIRONMENT = "production";
    process.env.NEXT_PUBLIC_FARO_URL = "https://faro.example.com";
    localStorage.setItem("cookie-consent", "granted");

    const { rerender } = render(<FaroProvider />);

    expect(initializeFaro).toHaveBeenCalledTimes(1);
    expect(initializeFaro).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://faro.example.com",
        app: expect.objectContaining({
          name: "best-route-frontend",
          environment: "production",
        }),
      }),
    );

    rerender(<FaroProvider />);
    expect(initializeFaro).toHaveBeenCalledTimes(1);
  });
});
