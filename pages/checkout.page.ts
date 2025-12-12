import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  async clickCheckoutAsGuest() {
    await this.page.locator("input.checkout-as-guest-button").click();
  }

  async clickBillingContinue() {
    await this.page
      .locator("#billing-buttons-container input.new-address-next-step-button")
      .click();
  }

  async fillRemainingBillingDetails(billing: any) {
    await this.page.fill("#BillingNewAddress_FirstName", billing.firstName);
    await this.page.fill("#BillingNewAddress_LastName", billing.lastName);
    await this.page.fill("#BillingNewAddress_Email", billing.email);
    await this.page.fill("#BillingNewAddress_City", billing.city);
    await this.page.fill("#BillingNewAddress_Address1", billing.address1);
    await this.page.fill("#BillingNewAddress_ZipPostalCode", billing.zip);
    await this.page.fill("#BillingNewAddress_PhoneNumber", billing.phone);
  }

  async selectBillingCountry(country: string) {
    await this.page.waitForSelector("#BillingNewAddress_CountryId");

    for (let i = 0; i < 3; i++) {
      await this.page.selectOption("#BillingNewAddress_CountryId", {
        label: country,
      });

      await this.page.waitForTimeout(500);

      const selected = await this.page.$eval(
        "#BillingNewAddress_CountryId",
        (el: HTMLSelectElement) => el.selectedOptions[0]?.text
      );

      if (selected === country) return;
    }

    throw new Error(`Country '${country}' could not be selected`);
  }

  async clickShippingContinue() {
    const btn = this.page.locator(
      "#shipping-buttons-container input.new-address-next-step-button"
    );
    await btn.waitFor({ state: "visible" });
    await btn.click();
    await this.page.waitForTimeout(800);
  }

  async clickShippingMethodContinue() {
    const btn = this.page.locator(
      "input.shipping-method-next-step-button"
    );
    await btn.waitFor({ state: "visible" });
    await btn.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickPaymentMethodContinue() {
    await this.page
      .locator("input.payment-method-next-step-button")
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickPaymentInfoContinue() {
    await this.page
      .locator("input.payment-info-next-step-button")
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickConfirmOrder() {
    await this.page
      .locator("input.confirm-order-next-step-button")
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyOrderTotals() {
    const money = (v: string) => parseFloat(v.replace(/[^0-9.]/g, ""));

    const productsTable = this.page.locator("table.cart");
    await productsTable.scrollIntoViewIfNeeded();
    await expect(productsTable).toBeVisible({ timeout: 15000 });

    const itemTotals = productsTable.locator(
      "tr.cart-item-row td.subtotal span.product-subtotal"
    );

    let calculatedSubTotal = 0;
    const count = await itemTotals.count();

    for (let i = 0; i < count; i++) {
      calculatedSubTotal += money(await itemTotals.nth(i).innerText());
    }

    calculatedSubTotal = +calculatedSubTotal.toFixed(2);

    const totalsTable = this.page.locator("table.cart-total");
    await totalsTable.scrollIntoViewIfNeeded();
    await expect(totalsTable).toBeVisible();

    const getTotalByLabel = async (label: string) => {
      const row = totalsTable.locator("tr", { hasText: label });
      await expect(row).toBeVisible();
      return money(await row.locator("td.cart-total-right").innerText());
    };

    const uiSubTotal = await getTotalByLabel("Sub-Total");
    const shipping = await getTotalByLabel("Shipping");
    const paymentFee = await getTotalByLabel("Payment method additional fee");
    const tax = await getTotalByLabel("Tax");

    const uiTotal = money(
      await totalsTable
        .locator("span.product-price.order-total")
        .innerText()
    );

    expect(uiSubTotal).toBe(calculatedSubTotal);

    const calculatedTotal = +(
      uiSubTotal +
      shipping +
      paymentFee +
      tax
    ).toFixed(2);

    expect(uiTotal).toBe(calculatedTotal);
  }
}
