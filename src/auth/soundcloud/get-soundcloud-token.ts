import 'dotenv/config'

import type { Page } from 'playwright'
import { soundcloudLogin } from './login-page'

export async function getSoundcloudAuthToken(page: Page) {
  const login = new soundcloudLogin(page)
  await login.navigateTo()
  await login.loginEmailModal()
}
