'use client'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import { SCREEN_PLAYS } from '@/lib/constants'
import { useParams } from 'next/navigation'
import React from 'react'

const GenreInner = () => {
  const params = useParams()
  const genre = params.genre

  const genreStr = Array.isArray(genre) ? genre[0] : genre

  const screenPlay = SCREEN_PLAYS.filter(
    (play) => genreStr?.toLowerCase() === play.genre.toLowerCase()
  )

  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-8 py-6 px-44 mt-6'>
      <div className='max-w-4xl text-center space-y-6'>
        <h1 className='text-5xl md:text-6xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          Discover the Art of Screenwriting and Unlock the Secrets
        </h1>
        <p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
          Explore a vast collection of meticulously crafted screenplays,
          industry insights, and engaging blogs designed to inspire and educate
          aspiring screenwriters worldwide.
        </p>
      </div>

      {/* <Search  /> */}
      <ScreenplayGrid screenplays={screenPlay} />
    </section>
  )
}

export default GenreInner
