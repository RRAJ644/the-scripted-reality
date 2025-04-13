import Link from 'next/link'
import { Button } from '../ui/button'

const MediaPartners = () => {
  return (
    <section className='w-full h-full text-center flex flex-col items-center justify-center max-lg:px-20 max-sm:px-4 py-10'>
      <div className='relative bg-gradient-to-b from-neutral-900 via-zinc-800 to-neutral-900 text-white p-12 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105 max-w-6xl flex flex-col gap-y-6 justify-center items-center'>
        <h3 className='text-2xl max-sm:text-lg md:text-3xl tracking-wide'>
          Elevate Your Brand with Expert Writing Services
        </h3>
        <p className='text-lg md:text-xl mb-6 font-light text-zinc-300'>
          Are you looking for engaging content that resonates with your
          audience? We craft compelling narratives for film, TV, music, and
          digital media to help your brand stand out and drive results.
        </p>

        <Link href={process.env.NEXT_PUBLIC_MEETING!} target='_blank'>
          <Button
            variant='outline'
            className='px-6 py-5 text-lg border-2 border-neutral-600 text-neutral-200 shadow-md rounded-3xl bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors duration-300'
          >
            Let&apos;s connect
          </Button>
        </Link>

        <div className='absolute top-0 left-0 w-20 h-20 bg-white opacity-10 blur-xl rounded-full animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-20 h-20 bg-zinc-400 opacity-10 blur-xl rounded-full animate-pulse'></div>
      </div>
    </section>
  )
}

export default MediaPartners
