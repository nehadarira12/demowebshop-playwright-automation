import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, expect } from '@playwright/test';

export class PlaywrightWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  expect = expect;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: false,   // 👈 show real browser window
        slowMo: 200        // 👈 optional: slows actions a bit
      });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
  }

  async destroy() {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);
