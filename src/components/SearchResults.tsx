import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResultsProps {
  isLoading: boolean
  results: Movie[]
  onResultClick: () => void
}

export function SearchResults({
  isLoading,
  results,
  onResultClick,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center p-2 space-x-3">
            <Skeleton className="h-24 w-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length > 0) {
    return (
      <ul className="space-y-2">
        {results.slice(0, 10).map((movie) => (
          <li key={movie.id} onClick={onResultClick}>
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
                width={64}
                height={96}
                alt={movie.title}
                className="mr-4 rounded-md object-cover h-24 w-16"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{movie.title}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="p-4 text-center text-muted-foreground">
      No results found.
    </div>
  )
}
