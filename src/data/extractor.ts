import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchAndParse(url: string) {
  try {
    // Make an HTTP GET request to fetch the raw HTML content
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
      },
    })

    // Load the HTML content using Cheerio
    const $ = cheerio.load(response.data)

    // Find the div with slot="text-body"
    const textBodyDiv = $('div[slot="text-body"]')

    // If the div exists, find all h3 headers within it
    const h3Headers: string[] = []
    textBodyDiv.find('h3').each((_index, element) => {
      const h3Text = $(element).text().trim()
      h3Headers.push(h3Text)
    })

    // Log or return the extracted content
    console.log(h3Headers)
    return h3Headers
  } catch (error) {
    console.error('Error fetching or parsing the HTML:', error)
    return []
  }
}

// URL of the Reddit post
const url =
  'https://www.reddit.com/r/DnB/comments/1eqay7r/new_music_pola_brysons_circles_chase_status_serum/'

// Call the function to fetch and parse the HTML
fetchAndParse(url)
