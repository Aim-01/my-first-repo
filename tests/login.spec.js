//  2

const {test, expect} = require('@playwright/test'); // импортирование из плэйрайт test, expect, единожды в одном файле

test.describe("Авториация на Соус Демо @ui", () => {  // описали набор теcтов

test('Пользователь должен успешно войти в систему @ui', async ({  // описываем суть теста - успешный вход
    page }) => {
        await page.goto('https://www.saucedemo.com/'); // переход на страницу
        await page.locator('#user-name').fill("standard_user"); // ввод логина (локатор по ID)
        await page.locator('[placeholder="Password"]').fill('secret_sauce'); // ввод пароля по названию плейсхолдера
        await page.locator('[data-test="login-button"]').click(); // клик кнопки по data-test атрибуту 
        await 
    expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //проверяем изменение урла
 });
 });



//  3


test.describe("Авториация на Соус Демо", () => {  // описали набор тетов

test('Пользователь заблокирован, неуспешный вход @ui', async ({  // описываем суть теста - неуспешная попытка входа
    page }) => {
      await page.goto('https://www.saucedemo.com/'); // переход на страницу
      await page.locator('#user-name').fill("locked_out_user"); // ввод логина locked_out_user (локатор по ID)
      await page.locator('[placeholder="Password"]').fill('secret_sauce'); // ввод пароля по названию плейсхолдера
      await page.locator('[data-test="login-button"]').click(); // клик кнопки по data-test атрибуту 
      await 
    expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.'); // ищем на странице текст ошибки для подтверждения ошибки входа
 });
});