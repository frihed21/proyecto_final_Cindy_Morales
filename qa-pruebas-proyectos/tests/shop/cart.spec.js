import { test, expect } from '../fixtures';

const PRODUCTNAME = 'Blue Top';

test.describe('CP-SHOP-01:Tienda Virtual', () => {
  test('CP-SHOP-02:Agregar producto al carrito', async ({ homePage, productPage, cartPage }) => {
    // Abrir la página de inicio
    await homePage.openProduct(PRODUCTNAME);
    await expect(productPage.title).toHaveText(PRODUCTNAME, {timeout: 15000});
    await productPage.addToCart();
    await expect(productPage.confirmation).toBeVisible();
    await productPage.continueshopping();
    await productPage.opencart();
    await expect(cartPage.rowFor(PRODUCTNAME)).toBeVisible();
    await expect(cartPage.quantityOf(PRODUCTNAME)).toHaveText("1");
  });
});