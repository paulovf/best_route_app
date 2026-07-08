import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "@/app/result/fail/page";
import { useRoute } from "@/context/RouteContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

describe("ErrorPage Screen", () => {
  const mockUseRoute = useRoute as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main title and layout structure", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: null,
      setRouteData: jest.fn(),
      setErrorData: jest.fn(),
      clearStorage: jest.fn(),
    });

    render(<ErrorPage />);

    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();
  });

  it("should render specific friendly message for Route API failure (invalid itinerary)", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: {
        status: 500,
        message: "Unable to generate a valid itinerary",
      },
      setRouteData: jest.fn(),
      setErrorData: jest.fn(),
      clearStorage: jest.fn(),
    });

    render(<ErrorPage />);

    expect(
      screen.getByText(
        "Não foi possível gerar um itinerário válido com os locais informados. Verifique os nomes das cidades e tente novamente.",
      ),
    ).toBeInTheDocument();
  });

  it("should render default fallback friendly message for AI search failure or general errors", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: {
        status: 502,
        message: "AI LLM service parsing failed or service unavailable",
      },
      setRouteData: jest.fn(),
      setErrorData: jest.fn(),
      clearStorage: jest.fn(),
    });

    render(<ErrorPage />);

    expect(
      screen.getByText(
        "Houve um problema ao processar a sua rota. Tente mais tarde.",
      ),
    ).toBeInTheDocument();
  });

  it("should render fallback message when errorData is completely null", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: null,
      setRouteData: jest.fn(),
      setErrorData: jest.fn(),
      clearStorage: jest.fn(),
    });

    render(<ErrorPage />);

    expect(
      screen.getByText(
        "Houve um problema ao processar a sua rota. Tente mais tarde.",
      ),
    ).toBeInTheDocument();
  });

  it("should contain the link to go back and restart the search pointing to the home page form", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: null,
      setRouteData: jest.fn(),
      setErrorData: jest.fn(),
      clearStorage: jest.fn(),
    });

    render(<ErrorPage />);

    const backLink = screen.getByRole("link", { name: /Refazer Nova Busca/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/#form-screen");
  });
});
