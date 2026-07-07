import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessPage from "@/app/result/success/page";
import { Option } from "@/types/route";

jest.mock("/src/mocks/routeMock", () => ({
  MOCK_API_RESPONSE: {
    origin_city: "Sorocaba",
    origin_state: "SP",
    destination_city: "Ubatuba",
    destination_state: "SP",
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
  },
}));

jest.mock("/src/app/components/layout/Topbar", () => {
  return function MockTopbar() {
    return <div data-testid="mocked-topbar" />;
  };
});

jest.mock("/src/app/components/layout/OptionCard", () => {
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

describe("SuccessPage screen", () => {
  it("should render locations and format the travel date safely into pt-BR standard", () => {
    render(<SuccessPage />);

    expect(screen.getByText("Sorocaba (SP)")).toBeInTheDocument();
    expect(screen.getByText("Ubatuba (SP)")).toBeInTheDocument();
    expect(screen.getByText("25/12/2026")).toBeInTheDocument();
  });

  it("should render the mandatory AI warning message disclaimer banner", () => {
    render(<SuccessPage />);

    expect(
      screen.getByText(
        /Valores, distâncias e tempos de viagem são estimados por Inteligência Artificial/i,
      ),
    ).toBeInTheDocument();
  });

  it("should render OptionCards systematically ordered by priority", () => {
    render(<SuccessPage />);

    const renderedCards = screen.getAllByTestId(/^option-card-/);

    expect(renderedCards[0]).toHaveAttribute("data-testid", "option-card-1");
    expect(renderedCards[1]).toHaveAttribute("data-testid", "option-card-2");
  });

  it("should output the pluralized summary message when multiple routes exist", () => {
    render(<SuccessPage />);

    expect(screen.getByText("2 opções encontradas")).toBeInTheDocument();
  });
});
