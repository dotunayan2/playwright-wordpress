class GetStartedPage {
    constructor(page) {
      this.page = page;
      this.getStartedButton = 'a.wp-block-button__link.wp-element-button[href="https://wordpress.com/start/?ref=logged-out-homepage-lp"]'; // Corrected selector for the "Get Started" button
      this.continueWithEmailButton = 'span.social-buttons__service-name:has-text("Continue with email")';
      this.signupEmailField = 'input[name="email"]';
      this.signupContinueButton = 'button[type="submit"]';
      this.errorMessage = '.form-input-validation.is-error';
    }
  
    async navigate() {
      await this.page.goto('https://wordpress.com/');
    }
  
    async clickGetStarted() {
      await this.page.click(this.getStartedButton);
    }

    async clickContinueWithEmail() {
      await this.page.click(this.continueWithEmailButton);
    }
  
    async signUpWithEmail(email) {
      await this.page.fill(this.signupEmailField, email);
      await this.page.click(this.signupContinueButton);
    }
  
    async getErrorMessage() {
      return await this.page.locator(this.errorMessage).innerText();
    }
  }
  
  module.exports = GetStartedPage;
  