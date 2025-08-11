import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getMovieById } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import BackButton from '@/components/BackButton'

type RouteParams<T extends Record<string, string>> = Promise<T>

export default async function MovieDetailPage({
  params,
}: {
  params: RouteParams<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)
  if (!Number.isInteger(numericId) || numericId <= 0) return notFound()

  try {
    const movie = (await getMovieById(numericId)) as Movie
    if (!movie?.id) return notFound()

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : ''
    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : ''

    return (
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <div className="relative container mx-auto px-4 py-16">
          <BackButton />
          <Card className="bg-background/60 border-foreground/20">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex-shrink-0">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="rounded-lg object-cover w-full shadow-2xl"
                    priority
                  />
                ) : (
                  <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
                )}
              </div>

              <div className="flex flex-col">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  {movie.release_date && (
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                    {Number(movie.vote_average || 0).toFixed(1)} / 10
                  </Badge>
                </div>
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch {
    return notFound()
  }
}
