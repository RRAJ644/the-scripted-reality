import { debounce } from 'lodash'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const useSearch = (delay = 800) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('query') || '')

  useEffect(() => {
    setQuery(searchParams.get('query') || '')
  }, [searchParams])

  const updatedSearchQuery = useCallback(
    debounce((newQuery: string) => {
      const params = new URLSearchParams(searchParams)
      if (newQuery) {
        params.set('query', newQuery)
      } else {
        params.delete('query')
      }
      router.push(`?${params.toString()}`, { scroll: false })
    }, delay),
    [searchParams, router]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    updatedSearchQuery(newQuery)
  }

  return { query, handleChange }
}

export default useSearch
