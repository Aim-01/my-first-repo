// Страница подтверждения заказа (шаг 2: обзор)
import { expect } from "playwright/test";

export class CheckoutStepTwoPage {
    constructor(page) {

        this.page = page;
        this.list_Products = page.locator('[data-test="cart-list"]'); // инфа о товарах в корзине
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout(){
        await this.finishButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    }
   
}