'use client'

import { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import useSearch from '@/hooks/useSearch'
import { useSearchParams } from 'next/navigation'
import Filters from '@/components/custom/Filters'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'

const ScriptsContent = () => {
  const [screenPlays, setScreenPlays] = useState([])

  const { query, handleChange } = useSearch()
  const searchParams = useSearchParams()
  const selectedGenres = searchParams.get('genres')?.split(' ') || []

  const getScreenplays = async () => {
    try {
      const res = await axios.get('/api/scripts')
      if (res.data.success) {
        setScreenPlays(res.data.data)
      } else {
        console.error('Failed to fetch screenplays:', res.data.message)
      }
    } catch (err) {
      console.error('Error fetching screenplays:', err)
    }
  }

  useEffect(() => {
    getScreenplays()
  }, [])

  const filteredByGenre = selectedGenres.length
    ? screenPlays.filter((script: any) =>
        selectedGenres?.includes(script.genre)
      )
    : screenPlays

  const finalFilteredScreenplays = filteredByGenre.filter((script: any) =>
    query ? script.title.toLowerCase().includes(query.toLowerCase()) : true
  )

  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-7 px-14 max-sm:px-4 py-5'>
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
