import { render, screen, fireEvent } from "@testing-library/react";
import CookieBanner from "./CookieBanner";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      message: "Test message",
      accept: "Accept",
      decline: "Decline",
    };
    return translations[key];
  },
}));

describe("CookieBanner Component", () => {
  let dispatchEventSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorage.clear();
    dispatchEventSpy = jest.spyOn(window, "dispatchEvent");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the banner if there is no consent in localStorage", () => {
    render(<CookieBanner />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should not render and should dispatch an event if consent has already been given", () => {
    localStorage.setItem("cookie-consent", "granted");
    render(<CookieBanner />);

    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe(
      "cookie-consent-granted",
    );
  });

  it("should save 'granted', dispatch event and hide banner when clicking Accept", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByText("Accept"));

    expect(localStorage.getItem("cookie-consent")).toBe("granted");
    expect(dispatchEventSpy).toHaveBeenCalled();
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("should save 'denied' and hide banner when clicking Decline", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByText("Decline"));

    expect(localStorage.getItem("cookie-consent")).toBe("denied");
    expect(dispatchEventSpy).not.toHaveBeenCalled();
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});
