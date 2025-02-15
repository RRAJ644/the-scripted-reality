import { Button } from '@/components/ui/button'
import Stats from './Stats'

const Hero = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center gap-y-20'>
      <div className='max-w-6xl'>
        <h1 className='text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          Discover the Art of Screenwriting and Unlock the Secrets
        </h1>
        <p className='mt-5 text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
          Explore a vast collection of meticulously crafted screenplays,
          industry insights, and engaging blogs designed to inspire and educate
          aspiring screenwriters worldwide.
        </p>
        <div className='mt-6 space-x-4'>
          {/* <Button className='px-6 py-5 text-lg bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-white shadow-md transition-all'>
            Explore
          </Button> */}
          <Button
            variant='outline'
            className='px-6 py-5 text-lg border-2 border-gray-600 text-gray-700 dark:text-gray-300 shadow-md hover:bg-zinc-800 hover:text-white transition-all'
          >
            Join the Community
          </Button>
        </div>
      </div>

      <Stats />
    </section>
  )
}

export default Hero
