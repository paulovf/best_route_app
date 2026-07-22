import React from "react";
import { render, screen } from "@testing-library/react";
import { OptionCardStep } from "@/app/[locale]/components/layout/OptionCard/Step";
import { Step } from "@/types/route";

jest.mock("/src/utils/routeFormatters", () => ({
  getTransportIcon: (type: string) => (
    <span data-testid={`transport-icon-${type}`} />
  ),
  getTransportTypeLabel: (type: string) => `Label-${type}`,
  getLocationIcon: (type: string) => (
    <span data-testid={`location-icon-${type}`} />
  ),
  formatDuration: (hours: number) => `${hours}h total`,
  formatPrice: (amount: number) => `$${amount}`,
}));

const mockSteps: Step[] = [
  {
    order: 2,
    transport_type: "bus",
    kilometers: 100,
    average_amount: 50,
    origin_city: "Campinas",
    origin_state: "SP",
    origin_departure: "Bus Terminal A",
    origin_departure_type: "bus_station",
    destination_city: "Santos",
    destination_state: "SP",
    destination_arrival: "Bus Terminal B",
    destination_arrival_type: "bus_station",
    duration_hours: 2,
  },
  {
    order: 1,
    transport_type: "app_mobile",
    kilometers: 15,
    average_amount: 30,
    origin_city: "São Paulo",
    origin_state: "SP",
    origin_departure: "Home Address",
    origin_departure_type: "home",
    destination_city: "Campinas",
    destination_state: "SP",
    destination_arrival: "Bus Terminal A",
    destination_arrival_type: "bus_station",
    duration_hours: 0.5,
  },
];

describe("OptionCardStep Component", () => {
  it("should render all steps matching the provided props data", () => {
    render(<OptionCardStep steps={mockSteps} />);

    expect(screen.getByText(/Home Address/)).toBeInTheDocument();
    expect(screen.getByText(/Bus Terminal B/)).toBeInTheDocument();
  });

  it("should sort steps dynamically based on the order property", () => {
    render(<OptionCardStep steps={mockSteps} />);

    const firstStepText = screen.getByText(/Home Address/);
    const lastStepText = screen.getByText(/Bus Terminal B/);

    expect(firstStepText.compareDocumentPosition(lastStepText)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("should omit the vertical connecting line on the final step of the timeline", () => {
    const { container } = render(<OptionCardStep steps={mockSteps} />);

    const separatingLines = container.querySelectorAll(".bg-neutral-200");

    expect(separatingLines.length).toBe(1);
  });

  it("should alternate location icons using departure type for the first step and arrival type for subsequent steps", () => {
    render(<OptionCardStep steps={mockSteps} />);

    const locationIcons = screen.getAllByTestId(/^location-icon-/);

    expect(locationIcons[0]).toHaveAttribute(
      "data-testid",
      "location-icon-home",
    );
    expect(locationIcons[1]).toHaveAttribute(
      "data-testid",
      "location-icon-bus_station",
    );
  });
});
