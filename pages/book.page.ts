import { BasePage } from "./base.page";

export class BookPage extends BasePage {
  async addBookToCart(name: string) {
    const bookTile = this.page
      .locator(".product-item")               
      .filter({ hasText: name });             

    await bookTile.getByRole("button", { name: /add to cart/i }).click();
  }
  
}
