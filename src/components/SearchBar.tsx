'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true)
      fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results) {
            setResults(data.results)
          }
          setIsLoading(false)
        })
        .catch((err) => {
          console.error('Failed to fetch search results:', err)
          setIsLoading(false)
        })
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const showResults = !!debouncedQuery

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-muted"
      />
      {showResults && (
        <ul className="absolute z-10 w-full mt-2 bg-popover rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="flex items-center p-2 space-x-3">
                <Skeleton className="h-16 w-11 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </li>
            ))
          ) : results.length > 0 ? (
            results.slice(0, 10).map((movie) => (
              <li key={movie.id} onClick={() => setQuery('')}>
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex items-center p-2 hover:bg-accent rounded-md"
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : '/placeholder.png'
                    }
                    width={44}
                    height={64}
                    alt={movie.title}
                    className="mr-3 rounded-md object-cover h-16 w-11"
                  />
                  <span>{movie.title}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-muted-foreground">
              No results found.
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
