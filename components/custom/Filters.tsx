import Chip from './Chip'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '../ui/button'

const GENRES = [
  'Crime',
  'Psychological',
  'Romance',
  'RomCom',
  'SitCom',
  'Thriller',
  'Mystery',
  'Fantasy',
  'Sci-Fi',
  'Horror',
  'Action',
  'Adventure',
  'Historical',
  'Drama',
  'Musical',
  'Documentary',
  'Slice of Life',
  'Action-Comedy',
  'Superhero',
  'Family',
  'Coming-of-Age',
  'Noir',
  'Western',
  'Psychological Thriller',
  'Satire',
]

const Filters = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedGenres = searchParams.get('genres')?.split(',') || []
  const params = new URLSearchParams(searchParams)

  const handleGenreClick = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre]

    if (newGenres.length) {
      params.set('genres', newGenres.join(','))
    } else {
      params.delete('genres')
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleClear = () => {
    params.delete('genres')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <Suspense>
      <section className='container max-auto flex flex-wrap gap-3'>
        {GENRES.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            selected={selectedGenres.includes(genre)}
            onClick={() => handleGenreClick(genre)}
          />
        ))}

        {selectedGenres.length > 0 && (
          <Button
            variant={'ghost'}
            className='border-2 border-gray-50 rounded-full bg-red-500 text-slate-50 hover:text-slate-50 hover:bg-red-500'
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </section>
    </Suspense>
  )
}

export default Filters
