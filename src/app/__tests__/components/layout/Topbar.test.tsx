import { render, screen } from "@testing-library/react";
import Topbar from "@/app/[locale]/components/layout/Topbar";
import { useRoute } from "@/context/RouteContext";

jest.mock("/src/context/RouteContext", () => ({
  useRoute: jest.fn(),
}));

describe("Topbar component", () => {
  const mockUseRoute = useRoute as jest.Mock;

  it("display component when prop show is true", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: { status: 500, message: "Error" },
    });

    render(<Topbar show={true} />);

    const header = screen.getByRole("banner");

    expect(header).toHaveClass("opacity-100");
    expect(header).not.toHaveClass("opacity-0");
  });

  it("hide component when prop show is false", () => {
    mockUseRoute.mockReturnValue({
      routeData: null,
      errorData: { status: 500, message: "Error" },
    });

    render(<Topbar show={false} />);

    const header = screen.getByRole("banner");

    expect(header).toHaveClass("opacity-0");
  });
});
