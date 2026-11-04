export class HomePage {
    constructor(page) {
        this.page = page; //guardo las propiedad de mi pagina
   }
    //metodo para abrir la pagina de login
    async goto(){
        await this.page.goto('/');
    }

    //metodo para abrir la pagina de productos
   async openProduct(name) {
    const card = this.page.locator('.product-image-wrapper').filter({
        has: this.page.getByText(name, { exact: true })
    });
    await card.getByRole('link', { name: ' View Product' }).click();
}
}

