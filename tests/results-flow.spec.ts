import { test, expect } from '@playwright/test';

test.describe('Result Screen - Travel Options Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/results'); 
  });

  test('should display header information and the correct number of options found', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /sorocaba/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /ubatuba/i })).toBeVisible();

    const optionsCounter = page.locator('p.text-xs.text-slate-500');
    await expect(optionsCounter).toContainText('opções encontradas');
  });

  test('should expand option card to reveal description and timeline steps upon interaction', async ({ page }) => {
    const firstCard = page.getByRole('article').first();
    
    await expect(firstCard.locator('p.text-xs.text-neutral-700')).not.toBeVisible();

    await firstCard.getByText(/hrs|h/i).first().click();

    await expect(firstCard.locator('p.text-xs.text-neutral-700')).toBeVisible(); 
  });

  test('should trigger the handleNewSearch action when clicking the recalculate button', async ({ page }) => {
    const consoleLogs: string[] = [];
    page.on('console', msg => consoleLogs.push(msg.text()));

    const btnRecalculate = page.locator('#btn-recalculate');
    await expect(btnRecalculate).toBeVisible();
    await btnRecalculate.click();

    expect(consoleLogs).toContain('Redirecionar para home/busca');
  });
});
