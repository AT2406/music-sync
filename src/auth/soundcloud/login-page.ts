import type { Page, Locator } from 'playwright'

export class soundcloudLogin {
  protected page: Page
  protected url: string
  public readonly emailInput: Locator
  public readonly passwordInput: Locator

  constructor(page: Page) {
    this.page = page
    this.url = ''
    this.emailInput = this.page.getByTestId('login-username')
    this.passwordInput = this.page.getByTestId('login-password')
  }
  public async navigateTo() {
    await this.page.goto(this.url)
  }
}
