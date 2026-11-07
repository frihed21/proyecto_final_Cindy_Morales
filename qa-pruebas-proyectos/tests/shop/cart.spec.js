import { test, expect } from '../fixtures';

const PRODUCTNAME = ['Blue Top','Stylish Dress','Sleeveless Dress','Madame Top For Women'];


test.describe('Tienda Virtual', () => {
for (const productName of PRODUCTNAME) {
    test(`CP-SHOP-01:Agregar producto al carrito: ${productName}`, async ({ homePage, productPage, cartPage }) => {
        // Abrir la página del producto
        await homePage.openProduct(productName);
        // Validar el nombre del producto
        await expect(productPage.title).toBeVisible();
        await expect(productPage.title).toHaveText(productName);
        // Agregar producto al carrito
        await productPage.addToCart();
        await expect(productPage.confirmation).toBeVisible();
        // Continuar comprando y abrir el carrito
        await productPage.continueshopping();
        await productPage.opencart();
        // Validar que el producto esté en el carrito
        await expect(cartPage.rowFor(productName)).toBeVisible();
        await expect(cartPage.quantityOf(productName)).toHaveText('1');
    });
  }
});

/*test.describe('Tienda Virtual', () => {
  test('CP-SHOP-01:Agregar producto al carrito', async ({ homePage, productPage, cartPage }) => {
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
});*/
