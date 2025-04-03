'use client'
import { Suspense } from 'react'
import useSearch from '@/hooks/useSearch'
import { useSearchParams } from 'next/navigation'
import Filters from '@/components/custom/Filters'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'
import { SCREEN_PLAYS } from '@/lib/constants'

const ScriptsContent = () => {
  const { query, handleChange } = useSearch()
  const searchParams = useSearchParams()
  const selectedGenres = searchParams.get('genres')?.split(',') || []

  const filteredByGenre = selectedGenres.length
    ? SCREEN_PLAYS.filter((script) => selectedGenres.includes(script.genre))
    : SCREEN_PLAYS

  const finalFilteredScreenplays = filteredByGenre.filter((script) =>
    query ? script.title.toLowerCase().includes(query.toLowerCase()) : true
  )

  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-7 py-6 px-44'>
      <Search query={query} handleChange={handleChange} />
      <Filters />
      <ScreenplayGrid screenplays={finalFilteredScreenplays} />
    </section>
  )
}

const Scripts = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScriptsContent />
    </Suspense>
  )
}

export default Scripts
