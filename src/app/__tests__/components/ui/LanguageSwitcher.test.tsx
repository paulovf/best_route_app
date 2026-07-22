import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setTestLocale } from "@/test/i18n";
import Home from "@/app/[locale]/page";
import LanguageSwitcher from "@/app/[locale]/components/ui/LanguageSwitcher";

const replaceMock = jest.fn((pathname, options) => {
  setTestLocale(options.locale);
});

jest.mock("/src/i18n/routing", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/",
}));

jest.mock("/src/context/RouteContext", () => ({
  useRoute: () => ({
    routeData: null,
    errorData: null,
    setRouteData: jest.fn(),
    setErrorData: jest.fn(),
    clearStorage: jest.fn(),
  }),
}));

jest.mock("/src/app/[locale]/components/layout/Topbar", () => {
  return function MockTopbar({ show }: { show: boolean }) {
    return (
      <div data-testid="mock-topbar">Topbar - Show: {show.toString()}</div>
    );
  };
});

describe("LanguageSwitcher component", () => {
  beforeEach(() => {
    setTestLocale("pt");
    replaceMock.mockClear();
  });

  test("When click in change language button, switch app language", async () => {
    render(<LanguageSwitcher />);

    const switcherButton = await screen.getByRole("button", { name: /PT/i });
    expect(switcherButton).toBeInTheDocument();

    fireEvent.click(switcherButton);

    const englishOption = await screen.getByText("English");
    fireEvent.click(englishOption);

    expect(replaceMock).toHaveBeenCalledWith("/", {
      locale: "en",
    });
  });

  test("Change app language to english", async () => {
    setTestLocale("pt");

    const { rerender } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Encontre a melhor rota para sua viagem/i,
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /PT/i }));

    await userEvent.click(screen.getByText("English"));

    rerender(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Find the best route for your trip/i,
      }),
    ).toBeInTheDocument();
  });

  test("Change app language to spanish", async () => {
    setTestLocale("pt");

    const { rerender } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Encontre a melhor rota para sua viagem/i,
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /PT/i }));

    await userEvent.click(screen.getByText("Español"));

    rerender(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Encuentra la mejor ruta para tu viaje/i,
      }),
    ).toBeInTheDocument();
  });

  test("Change app language to french", async () => {
    setTestLocale("pt");

    const { rerender } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Encontre a melhor rota para sua viagem/i,
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /PT/i }));

    await userEvent.click(screen.getByText("Français"));

    rerender(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Trouvez le meilleur itinéraire pour votre voyage/i,
      }),
    ).toBeInTheDocument();
  });

  test("Change app language to germany", async () => {
    setTestLocale("pt");

    const { rerender } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Encontre a melhor rota para sua viagem/i,
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /PT/i }));

    await userEvent.click(screen.getByText("Deutsch"));

    rerender(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Finden Sie die beste Route für Ihre Reise/i,
      }),
    ).toBeInTheDocument();
  });
});
