import type { Page, Locator, FrameLocator } from 'playwright'
import { expect } from '../../utils/expect'

export class soundcloudLogin {
  protected page: Page
  protected url: string
  public readonly cookiesConsentButton: Locator
  public readonly heroCarousel: Locator
  public readonly loginButtonHome: Locator
  public readonly loginFrame: FrameLocator
  public readonly emailInput: Locator
  public readonly continueButton: Locator
  public readonly passwordInput: Locator

  constructor(page: Page) {
    this.page = page

    this.url = 'https://soundcloud.com/'

    this.cookiesConsentButton = this.page.getByRole('button', {
      name: 'I Accept',
    })

    this.heroCarousel = this.page.locator('[class="frontHero__carousel"]')

    this.loginButtonHome = this.page.locator(
      '[class="frontHero__signin"] > button[aria-label="Sign in"]'
    )

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
    await this.page.goto(this.url, { waitUntil: 'networkidle' })
    await this.cookiesConsentButton.click()
    await expect(this.heroCarousel).toBeVisible()
  }

  public async loginEmailModal() {
    await this.page.waitForTimeout(1000)
    await this.loginButtonHome.first().click()
    await this.page.waitForTimeout(1000)
    await this.emailInput.fill(process.env.SOUNDCLOUD_USER || '')
    await this.page.waitForTimeout(1000)
    await this.continueButton.click()
    // await this.passwordInput.fill(process.env.SOUNDCLOUD_PASSWORD || '')
    // await this.loginButton.click()
  }
}
