import { test, expect } from '../fixtures';

const productName = 'Blue Top';

test.describe('Tienda Virtual', () => {
  test('Agregar producto al carrito', async ({ homePage, productPage, cartPage }) => {
    // Abrir la página de inicio
    await homePage.openProduct(productName);
    await expect(productPage.title).toHaveText(productName);
    await productPage.addToCart();
    await expect(productPage.confirmation).toBeVisible();
    await productPage.continueshopping();
    await productPage.opencart();
    await expect(cartPage.rowFor(productName)).toBeVisible();
    await expect(cartPage.quantityOf(productName)).toHaveText("1");
  });
});