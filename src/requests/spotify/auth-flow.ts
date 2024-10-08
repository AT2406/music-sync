import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { URLSearchParams } from 'url'
import * as querystring from 'querystring'
import * as randomstring from 'randomstring'
import 'dotenv/config'
import { clientInformation, spotifyEndpoints } from '../../utils/constants'

try {
  console.log(clientInformation)
} catch (err) {
  console.error('cannot find client information', err)
}

const redirectUri = 'http://localhost:3000/callback'
const scope = 'user-read-private user-read-email'
const auth = querystring.stringify({
  response_type: 'code',
  client_id: clientInformation.clientId,
  scope: scope,
  redirect_uri: redirectUri,
  state: randomstring.generate(16),
  show_dialog: true,
})

const authUrl = `${spotifyEndpoints.accountAuth}${auth}`

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

const server = createServer(requestHandler)

server.listen(3000, async () => {
  console.log(`Server started at ${redirectUri}`)
  console.log('auth url:', authUrl)
})
