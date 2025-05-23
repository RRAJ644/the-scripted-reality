import React from 'react'
import { Sparkles, PenTool, BookOpenText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const features = [
  {
    icon: <Sparkles className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Compelling Screenplays',
    description:
      'Discover thought-provoking screenplays that bring characters and stories to life with cinematic brilliance.',
  },
  {
    icon: <PenTool className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Storytelling Excellence',
    description:
      'Unlock the secrets of masterful storytelling with expertly crafted narratives and character-driven plots.',
  },
  {
    icon: (
      <BookOpenText className='w-10 h-10 text-gray-700 dark:text-gray-100' />
    ),
    title: 'Curated for Writers & Readers',
    description:
      'Explore a diverse collection of screenplays and stories, handpicked for writers, creatives, and literary enthusiasts.',
  },
]

const Featured = () => {
  return (
    <section className='w-full flex flex-col items-center justify-center gap-y-6'>
      <div className='max-w-6xl mx-auto text-center space-y-4'>
        <h2 className='max-sm:text-3xl md:text-3xl lg:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text py-1'>
          Elevating the Art of Storytelling
        </h2>
        <p className='text-lg max-sm:px-8 text-gray-700 dark:text-gray-300'>
          Immerse yourself in award-worthy screenplays, dive into creative
          storytelling techniques, and explore stories that captivate the
          imagination.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 w-full max-w-7xl max-lg:px-10'>
        {features.map((feature, index) => (
          <Card
            key={index}
            className='group cursor-pointer border border-zinc-400 dark:border-zinc-600 bg-gradient-to-br from-white/60 to-gray-100/60 dark:from-zinc-900/60 dark:to-zinc-800/60 shadow-sm rounded-3xl hover:scale-105 transition-transform duration-500 flex flex-col items-center text-center'
          >
            <CardHeader className='flex items-center justify-center pb-2'>
              {feature.icon}
            </CardHeader>
            <CardContent className='text-center'>
              <CardTitle className='mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100'>
                {feature.title}
              </CardTitle>
              <p className='text-gray-600 dark:text-gray-400'>
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Featured
