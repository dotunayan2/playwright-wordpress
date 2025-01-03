class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameField = '#usernameOrEmail';
      this.passwordField = '#password';
      this.submitButton = 'button[type="submit"]';
      this.errorMessage = '.form-input-validation.is-error';
    }
  
    async navigate() {
      await this.page.goto('https://wordpress.com/log-in');
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameField, username);
      await this.page.click(this.submitButton);
      if (password) {
        await this.page.fill(this.passwordField, password);
      }
      await this.page.click(this.submitButton);
    }
  
    async getErrorMessage() {
      return await this.page.locator(this.errorMessage).innerText();
    }
  }
  
  module.exports = LoginPage;
  