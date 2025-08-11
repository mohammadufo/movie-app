import Link from 'next/link'
import { Button } from './ui/button'
import { Film, Bookmark } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import Search from './Search'

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Film className="text-red-500" /> Movie
          <span className="text-red-500">Night</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/watchlist" legacyBehavior passHref>
            <Button variant="ghost">
              <Bookmark className="mr-2 h-4 w-4" /> Watchlist
            </Button>
          </Link>
          <ModeToggle />
          <Search />
        </div>
      </nav>
    </header>
  )
}
