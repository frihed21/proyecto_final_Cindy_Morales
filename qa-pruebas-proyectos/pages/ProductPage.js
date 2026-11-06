export class ProductPage {
  constructor(page) {
    this.page = page; //guardo las propiedades de mi página
    //guardando los localizadores
    this.title = page.locator('.product-information h2');
    this.addCartButton = page.getByRole('button', { name: /Add to cart/i });
    //this.addCartButton = page.getByRole('button', { name: ' Add to cart' });
    this.confirmation = page.getByRole('heading', { level: 4, name: 'Added!' });
    this.continueshop = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartLink = page.getByRole('link', { name: /Cart/i });
    //this.cartLink = page.getByRole('link', { name: ' Cart' });
  }
  //método para agregar producto al carrito
  async addToCart() {
    await this.addCartButton.click();
  }

  async continueshopping() {
    await this.continueshop.click();
  }
  //método para abrir el carrito
  async opencart() {
    await this.cartLink.click();
  }
}