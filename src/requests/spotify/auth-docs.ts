import 'dotenv/config'
import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk'

const redirectUri = 'http://localhost:3000/'
// const postbackUrl = 'http://localhost:3000/'
const scope = ['user-read-private', 'user-read-email']
const clientID = process.env.SPOTIFY_CLIENT_ID || ''

const sdk = SpotifyApi.performUserAuthorization(
  clientID,
  redirectUri,
  scope,
  async (token: AccessToken) => {
    console.log(token)
  }
)
console.log(sdk)

const api = SpotifyApi.withClientCredentials(
  clientID,
  process.env.SPOTIFY_CLIENT_SECRET || ''
)

//@ts-ignore
const items = await api.search('The Beatles', ['artist'])

console.table(
  items.artists.items.map(item => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
  }))
)
