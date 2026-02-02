import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('e2e тест - покупка самого дорогого товара @ui', async ({ page }) => {

    // 1. Открыть страницу логина
    const loginPage = new LoginPage(page);
    await loginPage.open();

    // 2. Залогиниться
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Проверить, что открылась страница с товарами
    const inventoryPage = new InventoryPage(page);
    const title = await inventoryPage.getPageTitle();
    expect(title).toContain('Products');

    // 4. Отсортировать товары по цене (дорогие → дешёвые)
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

    // Получить название первого (самого дорогого) товара
    const firstItemName = await page.locator('.inventory_item_name').first().textContent();

    // Добавить его в корзину
    await page.locator('.inventory_item').first().locator('button').click();

    // 5. Перейти в корзину
    await inventoryPage.openCart();

    // 6. Проверить, что в корзине именно тот товар
    const cartPage = new CartPage(page);
    const cartItemName = await page.locator('.inventory_item_name').textContent();
    expect(cartItemName).toBe(firstItemName);

    // 7. Начать оформление заказа
    await cartPage.goToCheckout();

    // 8. Заполнить данные пользователя
    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');

    // 9. Нажать Continue
    await page.locator('[data-test="continue"]').click();

    // 10. Завершить покупку
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await checkoutStepTwo.finishCheckout();

    // 11. Проверить сообщение об успешном заказе
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.getCompletionMessage();
});