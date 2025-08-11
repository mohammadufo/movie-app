'use client'
import { useState, useEffect, useCallback } from 'react'

const WATCHLIST_KEY = 'movie-watchlist'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY)
    if (stored) {
      setWatchlist(JSON.parse(stored))
    }
  }, [])

  const updateLocalStorage = (updatedList: Movie[]) => {
    setWatchlist(updatedList)
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedList))
  }

  const addMovie = (movie: Movie) => {
    updateLocalStorage([...watchlist, movie])
  }

  const removeMovie = (movieId: number) => {
    const updatedList = watchlist.filter((m) => m.id !== movieId)
    updateLocalStorage(updatedList)
  }

  const isInWatchlist = useCallback(
    (movieId: number) => {
      return watchlist.some((m) => m.id === movieId)
    },
    [watchlist]
  )

  return { watchlist, addMovie, removeMovie, isInWatchlist }
}
