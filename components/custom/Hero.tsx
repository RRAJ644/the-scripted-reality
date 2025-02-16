import { Button } from '@/components/ui/button'
import Stats from './Stats'

const Hero = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center md:px-12 text-center gap-y-20 w-full'>
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
          <Button
            variant='outline'
            className='px-6 py-5 text-lg border-2 border-gray-600 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-zinc-800 hover:text-white transition-all rounded-3xl'
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
