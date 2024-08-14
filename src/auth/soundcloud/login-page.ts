import type { Page, Locator, FrameLocator } from 'playwright'

export class soundcloudLogin {
  protected page: Page
  protected url: string
  public readonly loginButtonHome: Locator
  public readonly loginFrame: FrameLocator
  public readonly emailInput: Locator
  public readonly continueButton: Locator
  public readonly passwordInput: Locator

  constructor(page: Page) {
    this.page = page

    this.url = 'https://soundcloud.com/'

    this.loginButtonHome = this.page.getByRole('button', { name: 'Sign In' })

    this.loginFrame = this.page.frameLocator(
      '.webAuthContainerWrapper > iframe'
    )

    this.emailInput = this.loginFrame.getByTestId('sign_in_up_email')

    this.continueButton = this.loginFrame.getByRole('button', {
      name: 'Continue',
      exact: true,
    })

    this.passwordInput = this.page.getByTestId('login-password')
  }
  public async navigateTo() {
    await this.page.goto(this.url)

    // await expect(
    //   this.loginContainer.or(this.loginToSpotifyText).first()
    // ).toBeVisible()
  }

  public async loginEmailModal() {
    await this.loginButtonHome.click()
    await this.emailInput.fill(process.env.SOUNDCLOUD_USER || '')
    await this.continueButton.click()
    // await this.passwordInput.fill(process.env.SOUNDCLOUD_PASSWORD || '')
    // await this.loginButton.click()
  }
}
