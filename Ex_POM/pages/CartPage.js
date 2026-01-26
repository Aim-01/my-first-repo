// Страница корзины
import { expect } from "playwright/test";

export class CartPage {
    constructor(page) {

        this.page = page;
        this.checkoutnButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.listItems = page.locator('[data-test="cart-list"]'); //  список добавленных товаров
    }
 
    async itemList(){
        await expect(this.listItems).toBeVisible();
    }

    async goToCheckout(){
        await this.checkoutnButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    }
   
}

