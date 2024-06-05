import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { URLSearchParams } from 'url'
import open from 'open'

const port = 8888
const clientId = '0799d3758a7e4c4aa97d4e71c838d4c6'
const redirectUri = 'http://localhost:8888/callback'
const scope = 'user-read-private user-read-email'
const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true`

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

server.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`)
  // Open the authorization URL in the default web browser
  await open(authUrl, { app: { name: 'google chrome' } })
})
