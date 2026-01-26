// Страница со списком товаров (главная после логина)
import { expect } from "playwright/test";

export class InventoryPage {
 
    constructor(page) {

        this.page = page;
        this.titleMainPage = page.locator('[data-test="title"]'); // локаторы для main page
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]'); // иконка корзины
        this.goodsList = page.locator('[data-test="inventory-list"]');
        
// у всех кнопок уникальные ID - перечислены все кнопки эдд-ту-кард к товарам
this.addToCartBackpack = page.locator('id=add-to-cart-sauce-labs-backpack');
this.addToCartT_Shirt = page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt');
this.addToCartOnesie = page.locator('id=add-to-cart-sauce-labs-onesie');
this.addToCartBike = page.locator('id=add-to-cart-sauce-labs-bike-light')
this.addToCartJacket = page.locator('id=add-to-cart-sauce-labs-fleece-jacket');
this.addToCartRed = page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)');

    }
   
async getPageTitle() {
    return this.titleMainPage.textContent();
}

async addItemToCart(itemName) {
    const items = {
        backpack: this.addToCartBackpack,
        tshirt: this.addToCartT_Shirt,
        onesie: this.addToCartOnesie,
        bike: this.addToCartBike,
        jacket: this.addToCartJacket,
        red: this.addToCartRed
    };

    const item = items[itemName];

    if (!item) {
        throw new Error(`Товар "${itemName}" не найден в списке локаторов`);
    }

    await item.click();
}
async openCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
}

}
