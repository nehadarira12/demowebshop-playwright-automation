import { Before, After } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';

Before(async function (this: PlaywrightWorld) {
  await this.init();
});

After(async function (this: PlaywrightWorld) {
  await this.destroy();
});
