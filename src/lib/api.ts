const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN

if (!API_READ_ACCESS_TOKEN) {
  throw new Error('Missing TMDB API Read Access Token in .env.local')
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      console.error(`API Error: ${response.statusText}`)
      throw new Error(`Failed to fetch data from ${endpoint}`)
    }
    return response.json()
  } catch (error) {
    console.error(error)
    throw new Error(`Network or parsing error when fetching from ${endpoint}`)
  }
}

export const getPopularMovies = (page: number = 1) => {
  return fetchFromTMDB<MoviesResponse>(
    `movie/popular?language=en-US&page=${page}`
  )
}

export const getMovieById = (id: number) => {
  return fetchFromTMDB<Movie>(`movie/${id}?language=en-US`)
}

export const searchMovies = (query: string, page: number = 1) => {
  return fetchFromTMDB<MoviesResponse>(
    `search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=${page}`
  )
}
