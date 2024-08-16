import axios from 'axios'
import * as cheerio from 'cheerio'
import { Releases, SongDetails } from '../types'
import * as fs from 'fs'

const songDetailRegex = /^(.+?) - (.+?) \[(.+)\]$/
export async function fetchAndParseRedditPost(
  url: string
): Promise<Releases[]> {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    const textBodyDiv = $('div[slot="text-body"]')

    const result: Releases[] = []

    textBodyDiv.find('h3').each((_index, element) => {
      const headerText = $(element).text().trim()
      const songs: SongDetails[] = []

      // Get the next siblings until we hit another h3 or the end
      let next = $(element).next()
      while (next.length && !next.is('h3')) {
        if (next.is('ul')) {
          next.find('li').each((_liIndex, liElement) => {
            $(liElement)
              .find('p')
              .each((_pIndex, pElement) => {
                const text = $(pElement).text().trim()
                const [textBeforePipe] = text.split('|').map(str => str.trim())

                if (textBeforePipe) {
                  const match = textBeforePipe.match(songDetailRegex)
                  if (match) {
                    const [, artist, title, label] = match
                    songs.push({
                      artist: artist.trim(),
                      title: title.trim(),
                      label: label.trim(),
                    })
                  }
                }
              })
          })
        }
        next = next.next()
      }

      // Add the genre and its associated song details to the array
      result.push({ category: headerText, songs })
    })

    // Log or return the extracted content with detailed information
    // console.log(JSON.stringify(result, null, 2))

    // Write the result to a JSON file
    const date = new Date()
      .toLocaleDateString()
      .replace('/', '-')
      .replace('/', '-')
    fs.writeFileSync(
      `src/data/output/song-data-${date}.json`,
      JSON.stringify(result, null, 2),
      'utf8'
    )
    console.log(`Data has been written to song-data-${date}.json`)

    return result
  } catch (error) {
    console.error('Error fetching or parsing the HTML:', error)
    return []
  }
}
