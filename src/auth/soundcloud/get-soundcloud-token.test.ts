import { Page, test } from 'playwright/test'
import { getSoundcloudAuthToken } from './get-soundcloud-token'

test('Soundcloud - Return Auth Token', async ({ page }) => {
  // exportVar('SPOTIFY_USER', `${process.env.SPOTIFY_USER}`)
  // exportVar('SPOTIFY_PASSWORD', `${process.env.SPOTIFY_PASSWORD}`)
  await getSoundcloudAuthToken(page as Page)
})
