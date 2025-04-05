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

  console.log(screenPlays, '=======screenPlays')

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

const payload = {
  title: 'The Midnight Heist',
  description:
    'A seasoned thief plans one last job before retirement, but everything goes wrong when his crew gets betrayed.',
  imageUrl:
    'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  hoverGif:
    'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif',
  genre: 'Crime',
  script: [
    {
      heading: 'INT. BANK VAULT - NIGHT',
      action:
        'The dimly lit vault is filled with safety deposit boxes. JAKE (40s, grizzled) picks a lock with precision.',
      dialogues: [
        {
          character: 'JAKE',
          parenthetical: '(whispering)',
          line: 'Almost there, just one more pin.',
        },
        {
          character: 'SARAH',
          line: 'Hurry up, Jake! The guards will be back any second.',
        },
      ],
      transition: 'CUT TO:',
    },
    {
      heading: 'EXT. BANK - NIGHT',
      action:
        'Rain pours down as SARAH (30s, nervous) keeps watch by the getaway car.',
      dialogues: [
        {
          character: 'SARAH',
          parenthetical: '(into radio)',
          line: 'Status check, Jake. We’re on borrowed time.',
        },
      ],
      transition: 'FADE OUT:',
    },
  ],
}

const Scripts = () => {
  const postScript = async () => {
    try {
      const res = await axios.post('/api/scripts', payload)
      console.log('✅ Script created:', res.data)
    } catch (err) {
      console.error('❌ Error creating script:', err)
    }
  }

  useEffect(() => {
    // postScript()
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScriptsContent />
    </Suspense>
  )
}

export default Scripts
