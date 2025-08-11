'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Info, PlayCircle } from 'lucide-react'

interface HeroSliderProps {
  movies: Movie[]
}

export default function HeroSection({ movies }: HeroSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {movies.slice(0, 5).map((movie) => (
          <CarouselItem key={movie.id}>
            <div
              className="relative h-[70vh] min-h-[500px] flex items-end p-8 md:p-12 text-white"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
              <div className="relative z-10 flex flex-col space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg leading-tight">
                  {movie.title}
                </h1>
                <p className="text-lg md:text-xl drop-shadow-md line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>
                <div className="flex space-x-4 pt-4">
                  <Link href={`/movie/${movie.id}`} passHref>
                    <Button
                      size="lg"
                      className="backdrop-blur-sm bg-primary/80 hover:bg-primary"
                    >
                      <Info className="mr-2 h-5 w-5" /> View Details
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="backdrop-blur-sm bg-secondary/80 hover:bg-secondary/100"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
