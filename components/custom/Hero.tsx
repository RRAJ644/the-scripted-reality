import Link from 'next/link'
import { Button } from '../ui/button'
import Stats from './Stats'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className='flex flex-col items-center justify-center md:px-12 text-center gap-y-16 w-full md:h-[55rem] max-sm:h-[45rem]'>
      <div className='max-w-6xl mx-auto flex flex-col items-center justify-center'>
        <h1 className='max-sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          Read the Best Screenplays & Stories
        </h1>
        <p className='mt-5 max-w-4xl text-lg max-sm:text-base sm:leading-normal text-gray-700 dark:text-gray-300 leading-relaxed'>
          Dive into the world of storytelling and scriptwriting from top writers
          across genres.
        </p>
        <div className='mt-6 space-x-4'>
          <Link href='/scripts'>
            <Button
              variant='outline'
              className='px-6 py-6 text-xl rounded-xl text-gray-50 bg-neutral-800 border-2 hover:bg-neutral-800 hover:text-gray-50'
            >
              Read Now
            </Button>
          </Link>
        </div>
      </div>

      <Stats />
    </section>
  )
}

export default Hero
