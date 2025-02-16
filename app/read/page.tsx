import Filters from '@/components/custom/Filters'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'

const Read = () => {
  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-9 py-6 px-44'>
      <Search />
      <Filters />
      <ScreenplayGrid />
    </section>
  )
}

export default Read
