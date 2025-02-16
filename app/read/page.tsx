import Filters from '@/components/custom/Filters'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'
import { SCREEN_PLAYS } from '@/lib/constants'

const Read = () => {
  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-9 py-6 px-44'>
      <Search />
      <Filters />
      <ScreenplayGrid screenplays={SCREEN_PLAYS} />
    </section>
  )
}

export default Read
