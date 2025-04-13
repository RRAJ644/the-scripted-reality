import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

const NEXT_PUBLIC_BACKEND_ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || 'http://localhost:3000/'

const TrendingStories = async () => {
  const fetchStories = async () => {
    try {
      const res = await axios.get(`${NEXT_PUBLIC_BACKEND_ENDPOINT}api/story`)
      return res.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const trendingStories: any = await fetchStories()

  return (
    <section className='w-full flex flex-col items-center justify-center gap-y-6'>
      <div className='max-w-6xl mx-auto text-center space-y-4'>
        <h2 className='max-sm:text-3xl md:text-3xl lg:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text py-1'>
          Trending Blogs
        </h2>
        <p className='text-lg max-sm:px-8 text-gray-700 dark:text-gray-300'>
          Read our trending words
        </p>
      </div>

      <div className='w-full max-w-6xl px-4'>
        <div className='flex flex-col gap-6'>
          {trendingStories.length > 0 &&
            trendingStories?.map((story: any, index: any) => (
              <Link href={`/blogs/${story.slug}`} key={story.slug}>
                <div
                  key={index}
                  className='flex items-center gap-5 border border-zinc-300 dark:border-zinc-700 py-5 px-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer'
                  aria-label={`Story: ${story.title}`}
                >
                  <div className='text-white shadow-md'>
                    <Image
                      src={story?.imageUrl}
                      alt={story.title}
                      width={100}
                      height={100}
                      className='w-20 h-20'
                    />
                  </div>

                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 truncate'>
                      {story.title}
                    </h3>
                    <article className='w-full prose prose-lg dark:prose-invert md:text-xl max-lg:text-lg max-w-7xl'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: story?.description,
                        }}
                      />
                    </article>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingStories
