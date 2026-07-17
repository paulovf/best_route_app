import { render, screen } from "@testing-library/react";
import PrivacyPolicyPage from "@/app/[locale]/privacy_policy/page";

jest.mock("/src/app/[locale]/components/layout/Topbar", () => {
  return function MockTopbar({ show }: { show: boolean }) {
    return (
      <div data-testid="mock-topbar">Topbar - Show: {show.toString()}</div>
    );
  };
});

describe("PrivacyPolicyPage Page", () => {
  beforeEach(() => {
    render(<PrivacyPolicyPage />);
  });

  it("should render the Topbar with the correct show prop", () => {
    const topbar = screen.getByTestId("mock-topbar");
    expect(topbar).toBeInTheDocument();
    expect(topbar).toHaveTextContent("Topbar - Show: true");
  });

  it("should render the main title and last update text", () => {
    const mainTitle = screen.getByRole("heading", {
      level: 1,
      name: "Política de Privacidade",
    });
    expect(mainTitle).toBeInTheDocument();

    const updateText = screen.getByText(/Última atualização: Julho de 2026/i);
    expect(updateText).toBeInTheDocument();
  });

  it("should render all the required legal sections", () => {
    const section1 = screen.getByRole("heading", {
      level: 2,
      name: "1. Uso de Geolocalização",
    });
    const section2 = screen.getByRole("heading", {
      level: 2,
      name: "2. Armazenamento e Retenção de Dados",
    });
    const section3 = screen.getByRole("heading", {
      level: 2,
      name: "3. Cookies e Rastreamento de Terceiros",
    });
    const section4 = screen.getByRole("heading", {
      level: 2,
      name: "4. Segurança",
    });

    expect(section1).toBeInTheDocument();
    expect(section2).toBeInTheDocument();
    expect(section3).toBeInTheDocument();
    expect(section4).toBeInTheDocument();
  });

  it("should render the back link pointing to the home page", () => {
    const backLink = screen.getByRole("link", {
      name: /Voltar para o início/i,
    });

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("should render core privacy commitment text", () => {
    const commitmentText = screen.getByText(
      /A sua privacidade é uma prioridade para nós/i,
    );
    expect(commitmentText).toBeInTheDocument();

    const nonStorageText1 = screen.getByText(/Não armazenamos/i);
    expect(nonStorageText1).toBeInTheDocument();

    const nonStorageText2 = screen.getByText(/os seus dados de localização/i);
    expect(nonStorageText2).toBeInTheDocument();
  });
});
