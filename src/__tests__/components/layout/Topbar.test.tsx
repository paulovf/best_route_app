import { render, screen } from "@testing-library/react";
import Topbar from "@/components/layout/Topbar";

describe("Topbar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("display component when prop show is true", () => {
    render(<Topbar show={true} />);

    const header = screen.getByRole("banner");

    expect(header).toHaveClass("opacity-100");
    expect(header).not.toHaveClass("opacity-0");
  });

  it("hide component when prop show is false", () => {
    render(<Topbar show={false} />);

    const header = screen.getByRole("banner");

    expect(header).toHaveClass("opacity-0");
  });
});
