export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface Releases {
  category: string
  songs: SongDetails[]
}

export interface SongDetails {
  artist: string
  title: string
  label: string
  // links?
}
