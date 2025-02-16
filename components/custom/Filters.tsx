'use client'

import { useState } from 'react'
import Chip from './Chip'

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

  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre]
    )
  }

  return (
    <section className='container max-auto flex flex-wrap gap-3'>
      {GENRES.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          selected={selectedGenres.includes(genre)}
          onClick={() => handleGenreClick(genre)}
        />
      ))}
    </section>
  )
}

export default Filters
