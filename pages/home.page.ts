import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  async open() {
    // Go to https://demowebshop.tricentis.com
    await this.goto();
  }
  async clickBooksMenu() {
    await this.page
      .locator('ul.top-menu a[href="/books"]')
      .first()
      .click();
  }
  


}
