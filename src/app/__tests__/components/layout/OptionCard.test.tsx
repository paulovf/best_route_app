import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionCard } from "@/app/components/layout/OptionCard";
import { Option } from "@/types/route";

jest.mock("/src/app/components/layout/OptionCard/Step", () => ({
  OptionCardStep: () => <div data-testid="mocked-steps-timeline" />,
}));

jest.mock("/src/utils/routeFormatters", () => ({
  formatDuration: (hours: number) => `${hours} hrs`,
  formatPrice: (amount: number) => `$${amount}`,
}));

const baseMockOption: Option = {
  order: 3,
  description: "Regular economic route description.",
  total_duration_hours: 5,
  total_kilometers: 350,
  total_amount: 120,
  steps: [],
};

describe("OptionCard Component", () => {
  let mockOnSelect: jest.Mock;

  beforeEach(() => {
    mockOnSelect = jest.fn();
  });

  it("should call onSelect callback when the main card article layout is clicked", () => {
    render(<OptionCard option={baseMockOption} onSelect={mockOnSelect} />);

    const cardArticle = screen.getByRole("article");
    fireEvent.click(cardArticle);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it("should toggle accordion visibility and show internal steps when header row is clicked", () => {
    render(<OptionCard option={baseMockOption} onSelect={mockOnSelect} />);

    expect(
      screen.queryByText(baseMockOption.description),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mocked-steps-timeline"),
    ).not.toBeInTheDocument();

    const accordionHeader = screen.getByText("5 hrs");
    fireEvent.click(accordionHeader);

    expect(screen.getByText(baseMockOption.description)).toBeInTheDocument();
    expect(screen.getByTestId("mocked-steps-timeline")).toBeInTheDocument();
  });

  it("should apply RECOMMENDED badge when order value equals 1", () => {
    const recommendedOption = { ...baseMockOption, order: 1 };
    render(<OptionCard option={recommendedOption} onSelect={mockOnSelect} />);

    const badge = screen.getByText("RECOMENDADA");
    expect(badge).toHaveClass("bg-primary-500");
  });

  it('should apply FASTEST badge when description contains string keyword "direta"', () => {
    const fastestOption = {
      ...baseMockOption,
      order: 3,
      description: "Esta é uma rota Direta super rápida",
    };
    render(<OptionCard option={fastestOption} onSelect={mockOnSelect} />);

    const badge = screen.getByText("MAIS RÁPIDA");
    expect(badge).toHaveClass("text-primary-600");
  });

  it("should fall back to ECONOMIC badge layout for default parameters", () => {
    render(<OptionCard option={baseMockOption} onSelect={mockOnSelect} />);

    const badge = screen.getByText("ECONÔMICA");
    expect(badge).toHaveClass("text-success");
  });
});
