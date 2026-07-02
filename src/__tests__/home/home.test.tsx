import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("Render default home alt text logo", () => {
    render(<Home />);

    const logo = screen.getByAltText("Best Route home logo");
    expect(logo).toBeInTheDocument();
  });

  it("Render title and subtitle", () => {
    render(<Home />);

    const title = screen.getByRole("heading", {
      name: /Encontre a melhor rota para sua viagem/i,
    });

    const subtitle = screen.getByText(
      "Compare caminhos, formas de transporte, preços e tempo de viagem entre cidades de todo o Brasil",
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("Render button calculate route", () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: /Calcular rota/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("Render buttons links", () => {
    render(<Home />);

    const githubApi = screen.getByRole("link", {
      name: /GitHub API/i,
    });

    const githubApp = screen.getByRole("link", {
      name: /GitHub App/i,
    });

    const linkedin = screen.getByRole("link", {
      name: /Meu Linkedin/i,
    });

    expect(githubApi).toBeInTheDocument();
    expect(githubApp).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();

    expect(githubApi).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_api",
    );

    expect(githubApp).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_app",
    );

    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/paulo-vitor-francisco",
    );
  });
});
