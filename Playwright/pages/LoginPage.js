// Страница входа (https://www.saucedemo.com/)
export class LoginPage {
    constructor(page) {

        this.page = page;
        this.usernameField = page.locator('#user-name'); // локаторы для полей ввода
        this.passwordField = page.locator("#password");
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async open(){
        await this.page.goto('https://www.saucedemo.com/'); // вход на страницу логина
    }

    async login(username, password) { // вводим логин-пароль - нажать кнопку входа
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}