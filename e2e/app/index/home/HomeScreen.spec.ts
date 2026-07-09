import { test, expect } from "@playwright/test";

test.describe("Home Page (HomeScreen)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.addStyleTag({
      content: `html { scroll-behavior: auto !important; }`,
    });
  });

  test("should render main texts and images (Hero Section)", async ({
    page,
  }) => {
    await expect(page.getByAltText("Best Route home logo")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Encontre a melhor rota para sua viagem",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Compare caminhos, formas de transporte, preços e tempo de viagem",
      ),
    ).toBeVisible();

    await expect(page.getByAltText("Plane")).toBeVisible();
  });

  test("should contain correct footer links and open in a new tab", async ({
    page,
  }) => {
    const apiLink = page.getByRole("link", { name: "GitHub API" });
    await expect(apiLink).toBeVisible();
    await expect(apiLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_api",
    );
    await expect(apiLink).toHaveAttribute("target", "_blank");

    const appLink = page.getByRole("link", { name: "GitHub App" });
    await expect(appLink).toBeVisible();
    await expect(appLink).toHaveAttribute(
      "href",
      "https://github.com/paulovf/best_route_app",
    );
    await expect(appLink).toHaveAttribute("target", "_blank");

    const linkedinLink = page.getByRole("link", { name: "Meu Linkedin" });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/paulo-vitor-francisco",
    );
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  test('should scroll page down when clicking the "Comece aqui" button', async ({
    page,
  }) => {
    const ctaButton = page.getByRole("button", { name: "Comece aqui" });
    const formSection = page.locator("#form-screen");

    await ctaButton.click();

    await expect(formSection).toBeVisible();
  });
});
