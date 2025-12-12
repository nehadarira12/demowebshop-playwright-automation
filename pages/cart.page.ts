import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  async getItemRows() {
    return this.page.locator("table.cart tr.cart-item-row");
  }

  async openFromNotificationBanner() {
    const notification = this.page.locator("#bar-notification");
    await notification.waitFor({ state: "visible", timeout: 5000 });
    await notification.getByRole("link", { name: /shopping cart/i }).click();
    await this.page.waitForURL("**/cart");
  }

  async getCartItems() {
    const rows = this.page.locator("tr.cart-item-row");
    const count = await rows.count();
    const items = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);

      const name = (await row.locator(".product-name").innerText()).trim();
      const unitPriceText = await row.locator(".product-unit-price").innerText();
      const qtyText = await row.locator(".qty-input").inputValue();
      const subtotalText = await row.locator(".product-subtotal").innerText();

      items.push({
        name,
        unitPrice: parseFloat(unitPriceText),
        qty: parseInt(qtyText, 10),
        subtotal: parseFloat(subtotalText),
      });
    }

    return items;
  }

  async getCartSubtotal() {
    const text = await this.page.locator(".cart-total-right").first().innerText();
    return parseFloat(text);
  }

  async acceptTerms() {
    await this.page.locator("#termsofservice").check();
  }

  async clickCheckout() {
    await this.page.locator("#checkout").click();
  }
}
