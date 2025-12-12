import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string = "/") {
    const baseUrl = "https://demowebshop.tricentis.com";

    // If you pass a full URL, use it as-is; otherwise prepend baseUrl
    const url = path.startsWith("http")
      ? path
      : `${baseUrl}${path}`;

    await this.page.goto(url);
  }
}
