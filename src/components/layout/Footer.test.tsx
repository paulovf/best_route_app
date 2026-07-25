import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer Component", () => {
  it("should render static content correctly including logo, text, and copyright with current year", () => {
    render(<Footer resultHref="/#form-screen" />);

    const logo = screen.getByAltText("Logo do rodapé do Best Route");
    expect(logo).toBeInTheDocument();
    expect(screen.getByText("Best Route")).toBeInTheDocument();
    expect(
      screen.getByText(/Encontre a melhor rota em segundos/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Paulo Vitor/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Todos os direitos reservados/i),
    ).toBeInTheDocument();
  });

  it("should point to success result page when mounted and route data has options", () => {
    render(<Footer resultHref="/result/success" />);

    const resultLink = screen.getByRole("link", { name: "Resultado" });
    expect(resultLink).toHaveAttribute("href", "/result/success");
  });

  it("should point to fail result page when mounted and error data exists", () => {
    render(<Footer resultHref="/result/fail" />);

    const resultLink = screen.getByRole("link", { name: "Resultado" });
    expect(resultLink).toHaveAttribute("href", "/result/fail");
  });

  it("should render external product and contact links with correct attributes", () => {
    render(<Footer resultHref="/#form-screen" />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const apiLink = screen.getByRole("link", { name: "GitHub API" });
    expect(apiLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_api",
    );

    const appLink = screen.getByRole("link", { name: "GitHub App" });
    expect(appLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_app",
    );

    const linkedinLink = screen.getByRole("link", { name: "Meu LinkedIn" });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/paulo-vitor-francisco",
    );

    const emailLink = screen.getByRole("link", { name: "Email" });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:paulovfrancisco@gmail.com",
    );
    expect(emailLink).not.toHaveAttribute("target");
  });
});
