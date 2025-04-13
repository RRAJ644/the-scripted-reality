import React from 'react'
import { BookOpen } from 'lucide-react'
import axios from 'axios'

const NEXT_FRONTEND_ENDPOINT =
  process.env.NEXT_FRONTEND_ENDPOINT || 'http://localhost:3000/'

const TrendingStories = async () => {
  const fetchStories = async () => {
    try {
      const res = await axios.get(`${NEXT_FRONTEND_ENDPOINT}api/story`)
      return res.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const trendingStories = await fetchStories()

  return (
    <section className='w-full flex flex-col items-center justify-center gap-y-6'>
      <div className='max-w-6xl mx-auto text-center space-y-4'>
        <h2 className='max-sm:text-3xl md:text-3xl lg:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text py-1'>
          Trending Stories
        </h2>
        <p className='text-lg max-sm:px-8 text-gray-700 dark:text-gray-300'>
          Read our trending words
        </p>
      </div>

      <div className='w-full max-w-6xl px-4'>
        <div className='flex flex-col gap-6'>
          {trendingStories.length > 0 &&
            trendingStories?.map((story: any, index: any) => (
              <div
                key={index}
                className='flex items-center gap-5 border border-zinc-300 dark:border-zinc-700 py-5 px-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer'
                aria-label={`Story: ${story.title}`}
              >
                <div className='p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-md'>
                  <BookOpen className='w-6 h-6' />
                </div>

                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 truncate'>
                    {story.title}
                  </h3>
                  <p className='text-zinc-700 dark:text-zinc-300 text-sm mb-2 line-clamp-3'>
                    {story.description}
                  </p>
                  {/* <span className='text-xs text-zinc-500 dark:text-zinc-400'>
                    {story.date}
                  </span> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingStories
