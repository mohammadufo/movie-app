import { getMovieById } from '@/lib/api'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import BackButton from '@/components/BackButton'

interface MovieDetailPageProps {
  params: {
    id: string
  }
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  try {
    const movie = await getMovieById(Number(params.id))

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

    return (
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <div className="relative container mx-auto px-4 py-16">
          <BackButton />
          <Card className="bg-background/60 border-foreground/20">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="rounded-lg object-cover w-full shadow-2xl"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                    {movie.vote_average.toFixed(1)} / 10
                  </Badge>
                </div>

                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {movie.overview}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-screen">
        <BackButton />
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="text-muted-foreground mt-2">
          Sorry, we couldn't find the details for this movie.
        </p>
      </div>
    )
  }
}
