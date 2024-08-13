import 'dotenv/config'
import { fetchAndParseRedditPost } from './data/get-songs-reddit'

// URL of the Reddit post
const url =
  'https://www.reddit.com/r/DnB/comments/1eexbxi/fresh_music_unglued_high_hardie_culture_shock_tim/'
// 'https://www.reddit.com/r/DnB/comments/1ekmc2b/new_tunes_spor_annix_amc_visla_wilkinson_sub/'
// 'https://www.reddit.com/r/DnB/comments/1eqay7r/new_music_pola_brysons_circles_chase_status_serum/'

fetchAndParseRedditPost(url)
