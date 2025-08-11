'use client' // Required to use the client-side BookmarkButton

import Image from 'next/image'
import Link from 'next/link'
import BookmarkButton from './BookmarkButton'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png'

  return (
    <div className="relative">
      <BookmarkButton movie={movie} />
      <Link href={`/movie/${movie.id}`} className="group">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={posterUrl}
            alt={movie.title}
            width={500}
            height={750}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold truncate">{movie.title}</h3>
      </Link>
    </div>
  )
}
