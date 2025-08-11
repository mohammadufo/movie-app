'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getPopularMovies } from '@/lib/api'
import MovieCard from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'

interface MovieListProps {
  initialMovies: Movie[]
}

export default function MovieList({ initialMovies }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const loadMoreMovies = async () => {
    setIsLoading(true)
    const newMoviesResponse = await getPopularMovies(page)
    const newMovies = newMoviesResponse.results

    if (newMovies.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...newMovies])
      setPage((prevPage) => prevPage + 1)
    } else {
      setHasMore(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreMovies()
    }
  }, [inView, hasMore, isLoading])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
      </div>

      {hasMore && !isLoading && <div ref={ref} className="h-1" />}
    </>
  )
}
