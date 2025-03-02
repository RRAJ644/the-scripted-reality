'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Filters from '@/components/custom/Filters'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'
import { SCREEN_PLAYS } from '@/lib/constants'

const ScriptsContent = () => {
  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const initialQuery = searchParams.get('query') || ''
    setQuery(initialQuery)
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    const params = new URLSearchParams(searchParams)
    if (newQuery) {
      params.set('query', newQuery)
    } else {
      params.delete('query')
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-9 py-6 px-44'>
      <Search query={query} handleChange={handleChange} />
      <Filters />
      <ScreenplayGrid screenplays={SCREEN_PLAYS} />
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
