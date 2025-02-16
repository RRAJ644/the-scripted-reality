'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

const Search = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(handler)
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <section className='container max-auto flex flex-wrap gap-3'>
      <Input
        type='text'
        placeholder='Search...'
        value={query}
        onChange={handleChange}
        className='p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </section>
  )
}

export default Search
