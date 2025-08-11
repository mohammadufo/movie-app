'use client'

import { useWatchlist } from '@/hooks/useWatchlist'
import MovieCard from '@/components/MovieCard'
import { Bookmark } from 'lucide-react'

export default function WatchlistPage() {
  const { watchlist } = useWatchlist()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Bookmark className="w-8 h-8 text-yellow-400" />
        My Watchlist
      </h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-400">
            Add movies to your watchlist to see them here.
          </p>
        </div>
      )}
    </main>
  )
}
