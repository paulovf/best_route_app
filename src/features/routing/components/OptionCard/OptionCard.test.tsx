import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionCard } from "./OptionCard";
import { Option, HighlightType } from "@/features/routing/types";

jest.mock("/src/features/routing/components/OptionCard/Step", () => ({
  OptionCardStep: () => <div data-testid="mocked-steps-timeline" />,
}));

jest.mock("/src/utils/formatters", () => ({
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
  it("should allow clicking the main card article layout", () => {
    render(<OptionCard option={baseMockOption} />);

    const cardArticle = screen.getByRole("article");
    fireEvent.click(cardArticle);

    expect(cardArticle).toBeInTheDocument();
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

  it.each([
    {
      highlight: "cheapest",
      badgeText: "ECONÔMICA",
      badgeClass: "text-success",
    },
    {
      highlight: "fastest",
      badgeText: "MAIS RÁPIDA",
      badgeClass: "text-primary-600",
    },
    {
      highlight: "most_convenient",
      badgeText: "MAIS PRÁTICA",
      badgeClass: "text-success",
    },
  ])(
    "should apply correct badge when highlight field is '$highlight'",
    ({ highlight, badgeText, badgeClass }) => {
      const option: Option = {
        ...baseMockOption,
        order: 3,
        highlight: highlight as HighlightType,
      };
      render(<OptionCard option={option} />);

      const badge = screen.getByText(badgeText);
      expect(badge).toHaveClass(badgeClass);
    },
  );
});
