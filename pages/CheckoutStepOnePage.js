// Страница оформления заказа (шаг 1: ввод данных)
export class CheckoutStepOnePage {
    constructor(page) {

        this.page = page;
        this.firstNameField = page.locator('#first-name'); // локаторы для полей ввода
        this.lastNameField = page.locator("#last-name");
        this.zipField = page.locator("#postal-code");
        this.continueButton = page.locator('[data-test="continue"]');
    }
    
    async fillUserInfo(firstname, lastname, postalcode) { // вводим ФИ и индекс
        await this.firstNameField.fill(firstname);
        await this.lastNameField.fill(lastname);
        await this.zipField.fill(postalcode);
    }

}