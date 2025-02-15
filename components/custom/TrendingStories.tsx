import React from 'react'
import { BookOpen } from 'lucide-react'

const trendingStories = [
  {
    title: 'The Rise of Digital Storytelling',
    description:
      'Explore how digital platforms are transforming the art of storytelling.',
    date: 'Sep 7, 2024',
  },
  {
    title: 'Mythology in Modern Cinema',
    description: 'Discover how ancient myths influence contemporary films.',
    date: 'Sep 6, 2024',
  },
  {
    title: 'Writing for the Web',
    description:
      'Learn techniques to write engaging content for online audiences.',
    date: 'Sep 5, 2024',
  },
  {
    title: 'Writing for the Web1',
    description:
      'Learn techniques to write engaging content for online audiences.',
    date: 'Sep 5, 2024',
  },
  {
    title: 'Writing for the Web2',
    description:
      'Learn techniques to write engaging content for online audiences.',
    date: 'Sep 5, 2024',
  },
  {
    title: 'Writing for the Web3',
    description:
      'Learn techniques to write engaging content for online audiences.',
    date: 'Sep 5, 2024',
  },
]

const TrendingStories = () => {
  return (
    <section className='py-16 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 text-transparent bg-clip-text py-6'>
          Trending Stories
        </h2>
      </div>
      <div className='max-w-7xl mx-auto'>
        <div className='space-y-6'>
          {trendingStories.map((story, index) => (
            <div
              key={index}
              className='flex items-center gap-6 border border-zinc-300 dark:border-zinc-700 py-6 px-5 bg-white dark:bg-zinc-900 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 cursor-pointer'
            >
              <div className='p-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full shadow-md'>
                <BookOpen className='w-7 h-7' />
              </div>
              <div className='flex-1'>
                <h3 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>
                  {story.title}
                </h3>
                <p className='text-zinc-700 dark:text-zinc-300 text-base mb-2'>
                  {story.description}
                </p>
                <span className='text-sm text-zinc-500 dark:text-zinc-400'>
                  {story.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingStories
