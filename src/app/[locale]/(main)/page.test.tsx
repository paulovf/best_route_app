import React from "react";
import { render, screen, act, within } from "@testing-library/react";
import Home from "./page";

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

jest.mock("./form/FormScreen", () => {
  const MockFormScreen = React.forwardRef<
    HTMLDivElement,
    React.Ref<HTMLDivElement>
  >(function MockFormScreen(props, ref) {
    return <div ref={ref} data-testid="mock-form-screen" />;
  });

  return {
    FormScreen: MockFormScreen,
  };
});

jest.mock(
  "/src/components/layout/Topbar",
  () =>
    function MockTopbar() {
      return <div data-testid="mock-topbar" />;
    },
);

jest.mock("/src/components/layout/Footer", () => ({
  Footer: () => <footer data-testid="mock-footer" />,
}));

jest.mock(
  "/src/components/ui/LanguageSwitcher",
  () =>
    function MockLang() {
      return <div data-testid="mock-lang" />;
    },
);

jest.mock("/src/features/routing/context/RouteContext", () => ({
  useRoute: () => ({
    routeData: null,
    errorData: null,
    setRouteData: jest.fn(),
    setErrorData: jest.fn(),
    clearStorage: jest.fn(),
  }),
}));

describe("Home page", () => {
  beforeEach(() => {
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

    const logo = await screen.getByAltText("Logo inicial do Best Route");
    expect(logo).toBeInTheDocument();
  });

  it("Render title and subtitle", async () => {
    render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const title = await screen.getByRole("heading", {
      name: /Encontre a melhor rota para sua viagem/i,
    });

    const subtitle = await screen.getByText(
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

    const button = await screen.getByRole("button", {
      name: /Comece aqui/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("Render buttons links", async () => {
    const { container } = render(<Home />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const buttonGroup = container.querySelector("#home-group-buttons");

    expect(buttonGroup).toBeInTheDocument();

    const githubApi = within(buttonGroup as HTMLElement).getByRole("link", {
      name: /GitHub API/i,
    });

    const githubApp = within(buttonGroup as HTMLElement).getByRole("link", {
      name: /GitHub App/i,
    });

    const linkedin = within(buttonGroup as HTMLElement).getByRole("link", {
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
