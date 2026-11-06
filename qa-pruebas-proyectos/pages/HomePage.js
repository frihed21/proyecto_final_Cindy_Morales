export class HomePage {
constructor(page) {
this.page = page;
this.products = page.locator('.product-image-wrapper');
}

// Método para abrir página de inicio
async goto() {
    await this.page.goto('/');
}

// Método para abrir página de producto
async openProduct(name) {

    // Identificar el contenedor por el nombre del producto
    const producto = this.products.filter({
        has: this.page.locator('p').getByText(name, { exact: true })
    });

    // Hacer clic en View Product
    await producto.getByRole('link', {
        name: 'View Product'
    }).click();

    // Esperar la navegación al detalle
    await this.page.waitForURL(/\/product_details\/\d+/);
}

}