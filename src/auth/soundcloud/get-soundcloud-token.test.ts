import { Page, test } from 'playwright/test'
import { getSoundcloudAuthToken } from './get-soundcloud-token'

test.use({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
})

test('Soundcloud - Return Auth Token', async ({ page }) => {
  // exportVar('SPOTIFY_USER', `${process.env.SPOTIFY_USER}`)
  // exportVar('SPOTIFY_PASSWORD', `${process.env.SPOTIFY_PASSWORD}`)
  await getSoundcloudAuthToken(page as Page)
})
