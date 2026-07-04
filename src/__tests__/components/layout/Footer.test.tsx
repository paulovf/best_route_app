import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render footer component", () => {
    render(<Footer />);

    const footer = screen.getByText("Desenvolvido por: Paulo Vitor - 2026");

    expect(footer).toBeInTheDocument();
  });
});
