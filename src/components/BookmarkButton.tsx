'use client'

import { Bookmark } from 'lucide-react'
import { useWatchlist } from '@/hooks/useWatchlist'
import { Button } from '@/components/ui/button'

interface BookmarkButtonProps {
  movie: Movie
}

export default function BookmarkButton({ movie }: BookmarkButtonProps) {
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist()
  const isBookmarked = isInWatchlist(movie.id)

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevents navigation if the button is inside a Link
    e.stopPropagation()

    if (isBookmarked) {
      removeMovie(movie.id)
    } else {
      addMovie(movie)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBookmarkClick}
      className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/75"
    >
      <Bookmark
        className={`transition-colors ${
          isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-white'
        }`}
      />
    </Button>
  )
}
