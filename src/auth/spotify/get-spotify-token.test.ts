import { test } from 'playwright/test'
import type { Page } from 'playwright/test'
import { exportVar } from '../../utils/utilities'
import { getSpotifyAuthToken } from './get-spotify-token'

test('Spotify - Return Auth Token', async ({ page }) => {
  exportVar('SPOTIFY_USER', `${process.env.SPOTIFY_USER}`)
  exportVar('SPOTIFY_PASSWORD', `${process.env.SPOTIFY_PASSWORD}`)
  getSpotifyAuthToken(page as Page)
})
