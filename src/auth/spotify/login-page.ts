import type { Page, Locator } from 'playwright'
import { expect } from '../../utils/expect'

export class spotifyLogin {
  protected page: Page
  protected url: string
  public readonly loginContainer: Locator
  public readonly loginToSpotifyText: Locator
  public readonly emailInput: Locator
  public readonly passwordInput: Locator
  public readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page

    this.url = 'https://accounts.spotify.com/en-GB/login'

    this.loginContainer = this.page.getByTestId('login-container')

    this.loginToSpotifyText = this.page.getByRole('heading', {
      name: 'Log in to Spotify',
    })

    this.emailInput = this.page.getByTestId('login-username')

    this.passwordInput = this.page.getByTestId('login-password')

    this.loginButton = this.page.getByTestId('login-button')
  }

  public async navigateTo() {
    await this.page.goto('https://accounts.spotify.com/en-GB/login')

    await expect(
      this.loginContainer.or(this.loginToSpotifyText).first()
    ).toBeVisible()
  }

  public async fillUserDetails() {
    await this.emailInput.fill(process.env.SPOTIFY_USER || '')
    await this.passwordInput.fill(process.env.SPOTIFY_PASSWORD || '')
    await this.loginButton.click()
  }

  // page.intercept from url gew1-dealer.spotify.com/ and then grab token from qsp to return auth token????
}
