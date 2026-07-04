import { render, screen, act } from "@testing-library/react";
import Home from "@/app/page";

const mockIBGEResponse = [
  {
    id: 1,
    nome: "São Paulo",
    microrregiao: { mesorregiao: { UF: { sigla: "SP" } } },
  },
  {
    id: 2,
    nome: "Rio de Janeiro",
    microrregiao: { mesorregiao: { UF: { sigla: "RJ" } } },
  },
];

describe("Home page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockIBGEResponse),
      }),
    ) as jest.Mock;
  });

  it("Render default home alt text logo", async () => {
    render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const logo = screen.getByAltText("Best Route home logo");
    expect(logo).toBeInTheDocument();
  });

  it("Render title and subtitle", async () => {
    render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const title = screen.getByRole("heading", {
      name: /Encontre a melhor rota para sua viagem/i,
    });

    const subtitle = screen.getByText(
      "Compare caminhos, formas de transporte, preços e tempo de viagem entre cidades de todo o Brasil",
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("Render button calculate route", async () => {
    render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const button = screen.getByRole("button", {
      name: /Começe aqui/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("Render buttons links", async () => {
    render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

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
