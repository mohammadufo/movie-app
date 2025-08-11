'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BookmarkButton from './BookmarkButton'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stopColor="#f6f7f8" offset="20%" />
      <stop stopColor="#edeef1" offset="50%" />
      <stop stopColor="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function MovieCard({ movie }: { movie: Movie }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png'

  const fallbackUrl = '/placeholder.png'

  return (
    <div className="relative">
      <BookmarkButton movie={movie} />
      <Link href={`/movie/${movie.id}`} className="group">
        <div className="overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
          <div className="relative aspect-[2/3]">
            <Image
              src={imageError ? fallbackUrl : posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`
                object-cover transition-all duration-300 group-hover:scale-105
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(500, 750)
              )}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true)
                setImageLoaded(true)
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
            )}
          </div>
        </div>
        <h3 className="mt-2 text-lg font-semibold truncate">{movie.title}</h3>
      </Link>
    </div>
  )
}
