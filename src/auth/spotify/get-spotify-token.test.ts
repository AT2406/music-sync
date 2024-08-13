import { Page, test } from 'playwright/test'
import { getSpotifyAuthToken } from './get-spotify-token'

test('Spotify - Return Auth Token', async ({ page }) => {
  // exportVar('SPOTIFY_USER', `${process.env.SPOTIFY_USER}`)
  // exportVar('SPOTIFY_PASSWORD', `${process.env.SPOTIFY_PASSWORD}`)
  await getSpotifyAuthToken(page as Page)
})
