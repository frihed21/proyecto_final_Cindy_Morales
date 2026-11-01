import {test, expect} from '@playwright/test';

test ('No existe producto', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('xyz');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();
    await expect(page.getByRole('heading', { name: 'Search results: xyz' })).toBeVisible();
    await expect(page.getByTestId('urun-sayisi')).toHaveText('0');
 });


test ('Probando esperas', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('xyz');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();
    await expect(page.getByRole('heading', { name: 'Search results: xyz' })).toBeVisible();
    //await page.waitForTimeout(3000); 
    await expect(page.getByTestId('urun-sayisi')).toHaveText('0');
   // expect(await page.getByTestId('urun-sayisi').textContent()).toBe('0');

});