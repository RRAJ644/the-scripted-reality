import Link from 'next/link'
import { Button } from '../ui/button'
import Stats from './Stats'

const Hero = () => {
  return (
    <section className='flex flex-col items-center justify-center md:px-12 text-center gap-y-20 w-full min-h-screen'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='max-sm:px-3 max-sm:text-2xl md:text-4xl lg:text-6xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          Discover the art of Screenwriting and Unlock the Secrets
        </h1>
        <p className='mt-5 text-xl max-sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-sm:px-5'>
          Explore a vast collection of meticulously crafted screenplays,
          industry insights, and engaging blogs designed to inspire and educate
          aspiring screenwriters worldwide.
        </p>
        <div className='mt-6 space-x-4'>
          <Link href='/work'>
            <Button
              variant='outline'
              className='px-6 py-5 text-lg rounded-2xl text-gray-50 bg-neutral-800 border-2 hover:bg-neutral-800 hover:text-gray-50'
            >
              Work with us
            </Button>
          </Link>
        </div>
      </div>

      <Stats />
    </section>
  )
}

export default Hero
