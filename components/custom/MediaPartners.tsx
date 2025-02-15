import { Button } from '../ui/button'

const MediaPartners = () => {
  return (
    <section className='w-full h-full text-center flex flex-col items-center justify-center'>
      <div className='relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-12 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-6xl flex flex-col gap-y-4 justify-center items-center'>
        <h3 className='text-3xl md:text-4xl font-semibold mb-6 tracking-tight'>
          Elevate Your Brand with Expert Writing Services
        </h3>
        <p className='text-lg md:text-xl mb-8 font-light'>
          Are you an entertainment company looking for top-tier content that
          resonates with your audience? We specialize in crafting compelling
          narratives, articles, and promotional content tailored to your brand’s
          vision. Whether you're in film, TV, music, or digital media, our team
          is here to help you create engaging content that drives results.
        </p>
        <Button
          variant='outline'
          className='w-fit px-8 py-6 text-lg border-2 border-gray-600 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-black hover:text-white transition-all ease-in-out duration-300'
        >
          Let's Work Together
        </Button>
      </div>
    </section>
  )
}

export default MediaPartners
