'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { SearchResults } from './SearchResults'

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
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

  // Reset search when the drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="container mx-auto max-w-2xl py-8">
          <DrawerHeader>
            <DrawerTitle>Search for a movie</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. The Matrix, Inception..."
              className="text-lg"
            />
          </div>
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <SearchResults
              isLoading={isLoading}
              results={results}
              onResultClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
