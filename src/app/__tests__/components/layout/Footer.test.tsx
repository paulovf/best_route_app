import { render, screen } from "@testing-library/react";
import { Footer } from "@/app/[locale]/components/layout/Footer";
import { useRoute } from "@/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

jest.mock("/src/hooks/useIsMounted", () => ({
  useIsMounted: jest.fn(),
}));

describe("Footer Component", () => {
  const baseMockContext = {
    setRouteData: jest.fn(),
    setErrorData: jest.fn(),
    clearStorage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render static content correctly including logo, text, and copyright with current year", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      ...baseMockContext,
      routeData: null,
      errorData: null,
    });

    render(<Footer />);

    const logo = screen.getByAltText("Best Route footer logo");
    expect(logo).toBeInTheDocument();
    expect(screen.getByText("Best Route")).toBeInTheDocument();
    expect(
      screen.getByText(/Encontre a melhor rota em segundos/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/© 2026 - Paulo Vitor/i)).toBeInTheDocument();
  });

  it("should point to form-screen when the component is not mounted yet", () => {
    jest.mocked(useIsMounted).mockReturnValue(false);
    jest.mocked(useRoute).mockReturnValue({
      ...baseMockContext,
      routeData: null,
      errorData: null,
    });

    render(<Footer />);

    const resultLink = screen.getByRole("link", { name: "Resultado" });
    expect(resultLink).toHaveAttribute("href", "/#form-screen");
  });

  it("should point to success result page when mounted and route data has options", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      ...baseMockContext,
      routeData: {
        id: "123",
        origin_city: "Belo Horizonte",
        origin_state: "MG",
        destination_city: "Vitoria",
        destination_state: "ES",
        travel_date: "2026-12-25",
        options: [],
      },
      errorData: null,
    });

    render(<Footer />);

    const resultLink = screen.getByRole("link", { name: "Resultado" });
    expect(resultLink).toHaveAttribute("href", "/#form-screen");
  });

  it("should point to fail result page when mounted and error data exists", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      ...baseMockContext,
      routeData: null,
      errorData: { message: "API Error" },
    });

    render(<Footer />);

    const resultLink = screen.getByRole("link", { name: "Resultado" });
    expect(resultLink).toHaveAttribute("href", "/result/fail");
  });

  it("should render external product and contact links with correct attributes", () => {
    jest.mocked(useIsMounted).mockReturnValue(true);
    jest.mocked(useRoute).mockReturnValue({
      ...baseMockContext,
      routeData: null,
      errorData: null,
    });

    render(<Footer />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const apiLink = screen.getByRole("link", { name: "GitHub API" });
    expect(apiLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_api",
    );

    const appLink = screen.getByRole("link", { name: "GitHub App" });
    expect(appLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_app",
    );

    const linkedinLink = screen.getByRole("link", { name: "Meu LinkedIn" });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/paulo-vitor-francisco",
    );

    const emailLink = screen.getByRole("link", { name: "Email" });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:paulovfrancisco@gmail.com",
    );
    expect(emailLink).not.toHaveAttribute("target");
  });
});
