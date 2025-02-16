import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, PenTool, BookOpenText } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Engaging Articles',
    description:
      'Immerse yourself in captivating stories and insightful articles for readers of all tastes.',
  },
  {
    icon: <PenTool className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Creative Insights',
    description:
      'Discover tips and techniques that inspire your imagination and enrich your reading experience.',
  },
  {
    icon: (
      <BookOpenText className='w-10 h-10 text-gray-700 dark:text-gray-100' />
    ),
    title: 'Curated Library',
    description:
      'Explore a diverse collection of classic and contemporary reads, handpicked for curious minds.',
  },
]

const Featured = () => {
  return (
    <section className='py-16 px-6 w-full flex flex-col gap-y-10'>
      <div className='max-w-6xl mx-auto text-center space-y-4'>
        <h2 className='text-4xl md:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text'>
          We Love Our Readers
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300'>
          Dive into compelling stories, unlock new perspectives, and fuel your
          imagination with every read. Experience the joy of learning, the
          thrill of discovery, and the magic of storytelling, all in one place.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {features.map((feature, index) => (
          <Card
            key={index}
            className='group cursor-pointer border border-zinc-400 dark:border-zinc-600 bg-gradient-to-br from-white/60 to-gray-100/60 dark:from-zinc-900/60 dark:to-zinc-800/60 shadow-sm rounded-3xl hover:scale-110 transition-transform duration-500'
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
