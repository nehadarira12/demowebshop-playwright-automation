import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { HomePage } from '../../pages/home.page';
import { BookPage } from "../../pages/book.page";
// import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import products from '../../data/products.json';
import userData from "../../data/user.json";

Given('I am on the Demo Web Shop home page', async function (this: PlaywrightWorld) {
  const home = new HomePage(this.page);
  await home.open();
});


When("I navigate to the Books category", async function (this: PlaywrightWorld) {
    const home = new HomePage(this.page);
    await home.clickBooksMenu(); // same logic, new wording
  });
  
  When(
    "I add the following books to the cart",
    async function (this: PlaywrightWorld, dataTable) {
      const books = dataTable.hashes() as { name: string }[];
  
      for (const { name } of books) {
        // Find the product card that contains the book title
        const productTile = this.page
          .locator(".product-item")
          .filter({ hasText: name });
  
        // Click its "Add to cart" button
        await productTile
          .getByRole("button", { name: /add to cart/i })
          .click();
  
        // Optional: small wait to let the green notification bar appear/disappear
        await this.page.waitForTimeout(500);
      }
    }
);

Then(
    "I open the cart from the notification",
    async function (this: PlaywrightWorld) {
      const cart = new CartPage(this.page);
      await cart.openFromNotificationBanner(); // same logic, just renamed
    }
  );
  Then(
    "the cart should show the correct items",
    async function (this: PlaywrightWorld) {
      const cart = new CartPage(this.page);
      const items = await cart.getCartItems();
  
      // We expect exactly 2 items
      this.expect(items.length).toBe(2);
  
      // Expected values (could later come from products.json)
      const expected: Record<string, number> = {
        "Computing and Internet": 10.0,
        "Fiction": 24.0,
      };
  
      for (const item of items) {
        // name should be one of the expected products
        this.expect(Object.keys(expected)).toContain(item.name);
  
        // unit price matches
        this.expect(item.unitPrice).toBe(expected[item.name]);
  
        // quantity = 1
        this.expect(item.qty).toBe(1);
  
        // subtotal = unitPrice * qty
        this.expect(item.subtotal).toBeCloseTo(
          item.unitPrice * item.qty,
          2
        );
      }
    }
  );

  Then(
    "the cart subtotal should be correct",
    async function (this: PlaywrightWorld) {
      const cart = new CartPage(this.page);
  
      const items = await cart.getCartItems();
      const expectedSubtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  
      const actualSubtotal = await cart.getCartSubtotal();
  
      this.expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
    }
  );

  Then('I accept the terms and conditions', async function (this: PlaywrightWorld) {
    const cart = new CartPage(this.page);
    await cart.acceptTerms();
  });
  Then('I click the checkout button', async function (this: PlaywrightWorld) {
    const cart = new CartPage(this.page);
    await cart.clickCheckout();
  });
  When("I checkout as a guest user", async function (this: PlaywrightWorld) {
    const checkout = new CheckoutPage(this.page);
    await checkout.clickCheckoutAsGuest();
  });
  
  When("I continue from the billing step", async function (this: PlaywrightWorld) {
    const checkout = new CheckoutPage(this.page);
    await checkout.clickBillingContinue();
  });
  When(
    "I select the billing country",
    async function (this: PlaywrightWorld) {
      const checkout = new CheckoutPage(this.page);
      await checkout.selectBillingCountry(userData.billing.country);
    }
  );

  When(
    "I fill in the remaining billing address details",
    async function (this: PlaywrightWorld) {
      const checkout = new CheckoutPage(this.page);
      await checkout.fillRemainingBillingDetails(userData.billing);
    }
  );

  When("I continue from the shipping step", async function (this: PlaywrightWorld) {
    const checkout = new CheckoutPage(this.page);
    await checkout.clickShippingContinue();
  });
  
  When(
    "I continue from the shipping method step",
    async function (this: PlaywrightWorld) {
      const checkout = new CheckoutPage(this.page);
      await checkout.clickShippingMethodContinue();
    }
  );
  
  When(
    "I continue from the payment method step",
    async function (this: PlaywrightWorld) {
      const checkout = new CheckoutPage(this.page);
      await checkout.clickPaymentMethodContinue();
    }
  );
  When("I continue from the payment information step", async function () {
    const checkout = new CheckoutPage(this.page);
    await checkout.clickPaymentInfoContinue();
  });
  When("I confirm the order", async function () {
    const checkout = new CheckoutPage(this.page);
    await checkout.clickConfirmOrder();
  });
  Then(
    "the order should be successfully processed",
    async function (this: PlaywrightWorld) {
      await this.expect(
        this.page.locator(".section.order-completed strong")
      ).toHaveText("Your order has been successfully processed!");
    }
  );
  Then(
    "the price totals should be correct",
    { timeout: 30_000 },
    async function () {
      const checkout = new CheckoutPage(this.page);
      await checkout.verifyOrderTotals();
    }
  );