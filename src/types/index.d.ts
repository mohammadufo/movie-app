interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
  backdrop_path: string
}

interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
