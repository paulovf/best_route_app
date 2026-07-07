import { test, expect } from '@playwright/test';

test.describe('Result Screen - Travel Options Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/result/success'); 
  });

  test('should display header information and the correct number of options found', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /São Paulo/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Niterói/i })).toBeVisible();

    const optionsCounter = page.locator('p.text-xs.text-slate-500');
    await expect(optionsCounter).toContainText('opções encontradas');
  });

  // test('should expand option card to reveal description and timeline steps upon interaction', async ({ page }) => {
  //   const browserErrors: string[] = [];
  //   page.on('pageerror', exception => browserErrors.push(`[CRASH] ${exception.message}`));
  //   page.on('console', msg => {
  //     if (msg.type() === 'error') browserErrors.push(`[CONSOLE ERROR] ${msg.text()}`);
  //   });

  //   await page.waitForLoadState('networkidle');

  //   const firstCard = page.getByRole('article').first();
  //   const descricao = firstCard.locator('p.text-xs.text-neutral-700');

  //   // Confirma que começa fechado
  //   await expect(descricao).not.toBeVisible();

  //   // 2. Localiza a DIV exata que carrega a propriedade onClick no seu código
  //   const headerDiv = firstCard.locator('div.flex.items-start.justify-between.gap-4');

  //   // 3. Força o disparo do clique injetando JavaScript direto no navegador (ignora bugs do Playwright)
  //   await headerDiv.evaluate((el) => (el as HTMLElement).click());

  //   // Aguarda o React processar a mudança de estado
  //   await page.waitForTimeout(500);

  //   // 4. Se o navegador cuspiu algum erro, nós vamos ver aqui no terminal!
  //   if (browserErrors.length > 0) {
  //     console.log('\n⚠️--- ERROS DETECTADOS NO NAVEGADOR ---');
  //     console.log(browserErrors.join('\n'));
  //     console.log('---------------------------------------\n');
  //   }

  //   // Validação final
  //   await expect(descricao).toBeVisible({ timeout: 2000 });
  // });

  test('should trigger the handleNewSearch action when clicking the recalculate button', async ({ page }) => {
    const botaoNovaConsulta = page.locator('#btn-recalculate');

    await expect(botaoNovaConsulta).toBeVisible();

    await botaoNovaConsulta.click();

    await expect(page).toHaveURL(/.*#form-screen/);
  });
});
