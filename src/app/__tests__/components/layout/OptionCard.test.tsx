import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionCard } from "@/app/[locale]/components/layout/OptionCard";
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
  highlight: "recommended",
};

describe("OptionCard Component", () => {
  it("should call onSelect callback when the main card article layout is clicked", () => {
    render(<OptionCard option={baseMockOption} />);

    const cardArticle = screen.getByRole("article");
    fireEvent.click(cardArticle);
  });

  it("should toggle accordion visibility and show internal steps when header row is clicked", () => {
    render(<OptionCard option={baseMockOption} />);

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
    render(<OptionCard option={recommendedOption} />);

    const badge = screen.getByText("RECOMENDADA");
    expect(badge).toHaveClass("bg-primary-500");
  });

  it('should apply CHEAPSET badge when highlight field is "cheapest"', () => {
    const fastestOption: Option = {
      ...baseMockOption,
      order: 3,
      highlight: "cheapest",
    };
    render(<OptionCard option={fastestOption} />);

    const badge = screen.getByText("ECONÔMICA");
    expect(badge).toHaveClass("text-success");
  });

  it('should apply FASTES badge when highlight field is "fastest"', () => {
    const fastestOption: Option = {
      ...baseMockOption,
      order: 3,
      highlight: "fastest",
    };
    render(<OptionCard option={fastestOption} />);

    const badge = screen.getByText("MAIS RÁPIDA");
    expect(badge).toHaveClass("text-primary-600");
  });

  it('should apply MOST_CONVENIENT badge when highlight field is "most_convenient"', () => {
    const fastestOption: Option = {
      ...baseMockOption,
      order: 3,
      highlight: "most_convenient",
    };
    render(<OptionCard option={fastestOption} />);

    const badge = screen.getByText("MAIS PRÁTICA");
    expect(badge).toHaveClass("text-success");
  });
});
