import 'dotenv/config'

import type { Page } from 'playwright'
import { spotifyLogin } from './login-page'

export function getSpotifyAuthToken(page: Page) {
  const login = new spotifyLogin(page)
  const nav = login.navigateTo()
  return console.log(`Spotify auth: `, nav)
}

import { parse } from 'url'
import { URLSearchParams } from 'url'
import * as querystring from 'querystring'
import * as randomstring from 'randomstring'
import { clientInformation } from '../../utils/constants'
import { IncomingMessage, ServerResponse } from 'http'
const redirectUri = 'http://localhost:3000/callback'
const scope = 'user-read-private user-read-email'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = querystring.stringify({
  response_type: 'code',
  client_id: clientInformation.clientId,
  scope: scope,
  redirect_uri: redirectUri,
  state: randomstring.generate(16),
  show_dialog: true,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestHandler = (req: IncomingMessage, res: ServerResponse): void => {
  const parsedUrl = parse(req.url || '', true)
  const query = new URLSearchParams(
    parsedUrl.query as Record<string, string | readonly string[]>
  )
  const code = query.get('code')

  if (code) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`Authorization code: ${code}`)
    console.log(`Authorization code: ${code}`)
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Authorization code not found')
  }
}
