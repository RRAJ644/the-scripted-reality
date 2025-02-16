import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'
import { SCREEN_PLAYS } from '@/lib/constants'
import React from 'react'

const GenreInner = () => {
  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-9 py-6 px-44'>
      <Search />
      <ScreenplayGrid screenplays={SCREEN_PLAYS} />
    </section>
  )
}

export default GenreInner
