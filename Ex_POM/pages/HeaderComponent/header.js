
export class HeaderComponent {


constructor(page) {
    this.page = page;
    this.cartButton = page.getByTestId('data-test="shopping-cart-link"');
    this.burgerButton = page.getByTestId('react-burger-menu-btn');
    this.logoText = page.getByText('Swag Labs'); // по тексту в лого
}
async clickButton() {
    await this.cartButton.click();
    await this.burgerButton.click();
    await this.logoText.describe();
}
}
