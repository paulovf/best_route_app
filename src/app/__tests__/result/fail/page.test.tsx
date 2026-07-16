import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "@/app/result/fail/page";
import { useRoute } from "@/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";

const mockReplace = jest.fn();

jest.mock("/src/hooks/useIsMounted", () => ({
  useIsMounted: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

describe("ErrorPage Screen", () => {
  const mockUseRoute = useRoute as jest.Mock;
  const mockUseIsMounted = useIsMounted as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIsMounted.mockReturnValue(true);
  });

  it("should render the main title and layout structure", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: { status: 500, message: "Error" },
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
        "Houve um problema ao processar a sua rota. Tente mais tarde.",
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

  it("should redirect to /#form-screen when errorData is null", () => {
    mockUseRoute.mockReturnValue({
      errorData: null,
    });

    render(<ErrorPage />);

    expect(mockReplace).toHaveBeenCalledWith("/#form-screen");
  });
});
