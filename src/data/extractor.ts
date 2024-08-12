import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchAndParse(url: string) {
  try {
    // Make an HTTP GET request to fetch the raw HTML content
    const response = await axios.get(url)

    // Load the HTML content using Cheerio
    const $ = cheerio.load(response.data)

    // Find the div with slot="text-body"
    const textBodyDiv = $('div[slot="text-body"]')

    // Object to hold the headers and their associated paragraphs
    const headersWithParagraphs: { [key: string]: string[] } = {}

    // Iterate through each h3 in the text body div
    textBodyDiv.find('h3').each((_index, element) => {
      const headerText = $(element).text().trim()
      const paragraphs: string[] = []

      // Get the next siblings until we hit another h3 or the end
      let next = $(element).next()
      while (next.length && !next.is('h3')) {
        if (next.is('ul')) {
          // Iterate through each li inside the ul
          next.find('li').each((_liIndex, liElement) => {
            // Extract text from p elements within li
            $(liElement)
              .find('p')
              .each((_pIndex, pElement) => {
                // Get the text content and split by "|"
                const text = $(pElement).text().trim()
                const [textBeforePipe] = text.split('|')
                paragraphs.push(textBeforePipe.trim())
              })
          })
        }
        next = next.next()
      }

      // Add the header and its associated paragraphs to the object
      headersWithParagraphs[headerText] = paragraphs
    })

    // Log or return the extracted content
    console.log(headersWithParagraphs)
    return headersWithParagraphs
  } catch (error) {
    console.error('Error fetching or parsing the HTML:', error)
    return {}
  }
}

// URL of the Reddit post
const url =
  'https://www.reddit.com/r/DnB/comments/1eqay7r/new_music_pola_brysons_circles_chase_status_serum/'

// Call the function to fetch and parse the HTML
fetchAndParse(url)
