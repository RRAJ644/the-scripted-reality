import { Input } from '@/components/ui/input'

interface SearchProps {
  query: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ query, handleChange }: SearchProps) => {
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
