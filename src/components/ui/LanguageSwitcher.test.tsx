import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const mockReplace = jest.fn();

jest.mock("/src/i18n/routing", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/rota-atual",
}));

jest.mock("next-intl", () => ({
  useLocale: () => "pt",
}));

describe("LanguageSwitcher component", () => {
  it("should render with the current active locale shortcut", () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText("PT")).toBeInTheDocument();
  });

  it("should open the dropdown menu and display available languages when clicked", async () => {
    render(<LanguageSwitcher />);

    const toggleButton = screen.getByRole("button", { name: /PT/i });
    await userEvent.click(toggleButton);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("should call router.replace with 'en' locale when English is selected", async () => {
    render(<LanguageSwitcher />);

    const toggleButton = screen.getByRole("button", { name: /PT/i });
    await userEvent.click(toggleButton);

    const englishOption = screen.getByText("English");
    await userEvent.click(englishOption);

    expect(mockReplace).toHaveBeenCalledWith("/rota-atual", {
      locale: "en",
    });
  });

  it("should call router.replace with 'es' locale when Español is selected", async () => {
    render(<LanguageSwitcher />);

    const toggleButton = screen.getByRole("button", { name: /PT/i });
    await userEvent.click(toggleButton);

    const spanishOption = screen.getByText("Español");
    await userEvent.click(spanishOption);

    expect(mockReplace).toHaveBeenCalledWith("/rota-atual", {
      locale: "es",
    });
  });

  it("should call router.replace with 'fr' locale when Français is selected", async () => {
    render(<LanguageSwitcher />);

    const toggleButton = screen.getByRole("button", { name: /PT/i });
    await userEvent.click(toggleButton);

    const frenchOption = screen.getByText("Français");
    await userEvent.click(frenchOption);

    expect(mockReplace).toHaveBeenCalledWith("/rota-atual", {
      locale: "fr",
    });
  });

  it("should call router.replace with 'de' locale when Deutsch is selected", async () => {
    render(<LanguageSwitcher />);

    const toggleButton = screen.getByRole("button", { name: /PT/i });
    await userEvent.click(toggleButton);

    const germanOption = screen.getByText("Deutsch");
    await userEvent.click(germanOption);

    expect(mockReplace).toHaveBeenCalledWith("/rota-atual", {
      locale: "de",
    });
  });
});
