'use client'

import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

const GENRES: string[] = [
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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre]
    )
  }

  return (
    <aside className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-1/6 mt-3 flex flex-col gap-y-3 items-center justify-center'>
      <h2 className='text-3xl font-bold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text'>
        Genres
      </h2>

      <div className='flex flex-col gap-y-2'>
        {GENRES.map((genre) => (
          <div key={genre} className='flex items-center space-x-4'>
            <Checkbox
              checked={selectedGenres.includes(genre)}
              onCheckedChange={() => handleGenreChange(genre)}
              className='h-5 w-5 text-blue-500 border-gray-300 dark:text-blue-400 dark:bg-gray-600 dark:border-gray-500 rounded-md focus:ring-2 focus:ring-blue-400'
            />
            <label
              htmlFor={genre}
              className='text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 transition-colors duration-300'
            >
              {genre}
            </label>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Filters
