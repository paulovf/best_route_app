import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessPage from "@/app/[locale]/result/success/page";
import { useRoute } from "@/context/RouteContext";
import { Option } from "@/types/route";
import { useIsMounted } from "@/hooks/useIsMounted";
import { mockReplace } from "@/test/mocks/routing";

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

jest.mock("/src/hooks/useIsMounted", () => ({
  useIsMounted: jest.fn(),
}));

jest.mock("/src/app/[locale]/components/layout/OptionCard", () => {
  return {
    OptionCard: function MockOptionCard({
      option,
    }: {
      option: Partial<Option> & Pick<Option, "order" | "description">;
    }) {
      return (
        <div data-testid={`option-card-${option.order}`}>
          {option.description}
        </div>
      );
    },
  };
});

const mockMultipleOptionsResponse = {
  origin_city: "Belo Horizonte",
  origin_state: "MG",
  destination_city: "Vitória",
  destination_state: "ES",
  travel_date: "2026-12-25T00:00:00.000Z",
  options: [
    {
      order: 2,
      description: "Option Two",
      total_duration_hours: 4,
      total_kilometers: 300,
      total_amount: 90,
      steps: [],
    },
    {
      order: 1,
      description: "Option One",
      total_duration_hours: 3,
      total_kilometers: 280,
      total_amount: 150,
      steps: [],
    },
  ],
};

describe("SuccessPage screen", () => {
  const mockUseRoute = useRoute as jest.Mock;
  const mockUseIsMounted = useIsMounted as jest.Mock;

  beforeEach(() => {
    mockUseIsMounted.mockReturnValue(true);
  });

  it("should render locations and format the travel date safely into pt-BR standard", () => {
    mockUseRoute.mockReturnValue({
      routeData: mockMultipleOptionsResponse,
      errorData: null,
    });

    render(<SuccessPage />);

    expect(screen.getByText("Belo Horizonte (MG)")).toBeInTheDocument();
    expect(screen.getByText("Vitória (ES)")).toBeInTheDocument();
    expect(screen.getByText("25/12/2026")).toBeInTheDocument();
  });

  it("should render the mandatory AI warning message disclaimer banner", () => {
    mockUseRoute.mockReturnValue({
      routeData: mockMultipleOptionsResponse,
      errorData: null,
    });

    render(<SuccessPage />);

    expect(
      screen.getByText(
        /Valores, distâncias e tempos de viagem são estimados por Inteligência Artificial/i,
      ),
    ).toBeInTheDocument();
  });

  it("should render OptionCards systematically ordered by priority (order ascending)", () => {
    mockUseRoute.mockReturnValue({
      routeData: mockMultipleOptionsResponse,
      errorData: null,
    });

    render(<SuccessPage />);

    const renderedCards = screen.getAllByTestId(/^option-card-/);

    expect(renderedCards[0]).toHaveAttribute("data-testid", "option-card-1");
    expect(renderedCards[1]).toHaveAttribute("data-testid", "option-card-2");
  });

  it("should output the pluralized summary message when multiple routes exist", () => {
    mockUseRoute.mockReturnValue({
      routeData: mockMultipleOptionsResponse,
      errorData: null,
    });

    render(<SuccessPage />);

    expect(screen.getByText("2 opção(ões) encontrada(s)")).toBeInTheDocument();
  });

  it("should output the singular summary message when only a single route exists", () => {
    mockUseRoute.mockReturnValue({
      routeData: {
        ...mockMultipleOptionsResponse,
        options: [mockMultipleOptionsResponse.options[0]],
      },
      errorData: null,
    });

    render(<SuccessPage />);

    expect(screen.getByText("1 opção(ões) encontrada(s)")).toBeInTheDocument();
  });

  it("should contain a operational link pointing back to the home page form anchor", () => {
    mockUseRoute.mockReturnValue({
      routeData: mockMultipleOptionsResponse,
      errorData: null,
    });

    render(<SuccessPage />);

    const backLink = screen.getByRole("link", { name: /Nova consulta/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/#form-screen");
  });

  it("should redirect to /#form-screen when routeData is null", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: null,
    });

    render(<SuccessPage />);

    expect(mockReplace).toHaveBeenCalledWith("/#form-screen");
  });
});
