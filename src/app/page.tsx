import { getPopularMovies } from '@/lib/api'
import MovieList from '@/components/MovieList'
import HeroSection from '@/components/HeroSection'

export default async function HomePage() {
  const initialMoviesResponse = await getPopularMovies(1)
  const movies = initialMoviesResponse.results

  return (
    <>
      <HeroSection movies={movies.slice(0, 5)} />

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular This Week</h2>
        <MovieList initialMovies={movies} />
      </main>
    </>
  )
}
