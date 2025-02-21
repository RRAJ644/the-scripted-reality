'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Filters from '@/app/components/custom/Filters'
import ScreenplayGrid from '@/app/components/custom/ScreenplayGrid'
import Search from '@/app/components/custom/Search'
import { SCREEN_PLAYS } from '@/lib/constants'

const Scripts = () => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <Search query={query} handleChange={handleChange} />
      </Suspense>
      <Filters />
      <ScreenplayGrid screenplays={SCREEN_PLAYS} />
    </section>
  )
}

export default Scripts
