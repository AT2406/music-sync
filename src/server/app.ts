import express from 'express'
import path from 'path'

const app = express()
const port = 3000

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// Serve the index.html file when the root is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'))
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
