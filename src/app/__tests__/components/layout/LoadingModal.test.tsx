import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingModal } from "@/app/components/layout/LoadingModal";

describe("LoadingModal Component", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("should not render anything when isOpen is false", () => {
    const { container } = render(<LoadingModal isOpen={false} />);

    expect(container.firstChild).toBeNull();
  });

  it("should render the modal and its texts when isOpen is true", () => {
    render(<LoadingModal isOpen={true} />);

    const title = screen.getByText("Estamos calculando sua rota");
    const subtitle = screen.getByText(
      "Por favor, aguarde alguns instantes. Não atualize ou feche a página.",
    );
    const logo = screen.getByAltText("Best Route modal loading logo");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it("should disable body scroll when open and restore it on unmount", () => {
    const { unmount } = render(<LoadingModal isOpen={true} />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("unset");
  });
});
