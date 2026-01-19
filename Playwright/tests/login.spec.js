// Сайт для автоматизации: Sauce Demo — это специальная площадка для тренировки навыков автоматизации.
//Часть 1: Подготовка проекта
//Создайте новую папку для вашего проекта.
//Инициализируйте Node.js проект. Откройте терминал в этой папке и выполните команду:
// npm init -y

//Установите Playwright. Выполните команду и следуйте инструкциям в терминале (можете выбрать JavaScript и оставить остальные настройки по умолчанию):
//npm init playwright@latest
//После установки у вас будет готовая структура проекта с примерами тестов.

//////////////////
// Часть 2: Написание теста
//Вам нужно написать тест, который проверяет успешный вход в систему.
//Создайте новый файл для теста в папке tests с названием login.spec.js.
//Напишите тест-кейс, который выполняет следующие шаги:
//Переходит на страницу https://www.saucedemo.com/.
//Находит поле для ввода логина и вводит standard_user.
//Находит поле для ввода пароля и вводит secret_sauce.
//Нажимает на кнопку "Login".
//Добавьте проверку (Assertion): после входа на сайт пользователь попадает на страницу с товарами. Убедитесь, что на новой странице URL содержит /inventory.html.



////////////////////////////////////////////////////////////////////2
//import { test, expect } from '@playwright/test';

//test('has title', async ({ page }) => {
 // await page.goto('https://www.saucedemo.com/'); // переход на сайт https://www.saucedemo.com/

  // Expect a title "to contain" a substring.
 // await expect(page).toHaveTitle(/Swag Labs/); // подтверждение что мы на нужной странице Swag Labs по названию страницы
//});

//test('login with standard_user', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');


 // await page.fill('#user-name', 'standard_user'); //ввод логина
  
 // await page.fill('#password', 'secret_sauce'); //ввод пароля
 // await page.click('#login-button'); // клик кнопки

 
 // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // проверяем изменение урла
//});


////2222222222222222222222222222222222222222222222222222222222222222222222222222
// Примерный код для файла tests/login.spec.js:


//const {test, expect} = require('@playwright/test');

//test.describe("Авториация на Соус Демо", () => {  // описали набор тетов

//test('Пользователь должен успешно войти в систему', async ({  // описываем суть теста
  //  page }) => {
    //     await page.goto('https://www.saucedemo.com/'); // переход на страницу
      //  await page.locator('#user-name').fill("standard_user"); // ввод логина (локатор по ID)
       // await page.locator('[placeholder="Password"]').fill('secret_sauce'); // ввод пароля по названию плейсхолдера
   // await page.locator('[data-test="login-button"]').click(); // клик кнопки по data-test атрибуту 
   // await 
   // expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //проверяем изменение урла
// });
// });


/////////////////////////////////////////////////////
//Часть 3: Запуск теста
//Откройте терминал в корневой папке проекта.
//Запустите все тесты с помощью команды:
//Bash

//npx playwright test


//Вы должны увидеть в консоли, что ваш тест успешно прошел.

/////////////////

//Дополнительное задание
//Напишите еще один тест в том же файле (login.spec.js), который проверяет сценарий неуспешного входа с заблокированным пользователем.
//Шаги для второго теста:
//Перейдите на страницу https://www.saucedemo.com/.
//Введите логин locked_out_user и пароль secret_sauce.
//Нажмите на кнопку "Login".
//Добавьте проверку: убедитесь, что на странице появилось сообщение об ошибке с текстом Epic sadface: Sorry, this user has been locked out..
//Как сдать: Загрузите ваш проект на ранее созданный GitHub репозиторий и отправьте ссылку на на него.
//ТАКЖЕ к письму приложите скриншот HTML репорта с успешным прохождением тестов ( запустите команду npx playwright show-report )


//33333333333333333333333333333333333333333333333333333

const {test, expect} = require('@playwright/test');

test.describe("Авториация на Соус Демо", () => {  // описали набор тетов

test('Пользователь заблокирован, неуспешный вход', async ({  // описываем суть теста
    page }) => {
         await page.goto('https://www.saucedemo.com/'); // переход на страницу
        await page.locator('#user-name').fill("locked_out_user"); // ввод логина locked_out_user (локатор по ID)
        await page.locator('[placeholder="Password"]').fill('secret_sauce'); // ввод пароля по названию плейсхолдера
    await page.locator('[data-test="login-button"]').click(); // клик кнопки по data-test атрибуту 
    await 
    expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
 });
});