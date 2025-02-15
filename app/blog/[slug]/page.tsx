'use client'

import { slugify } from '@/lib/constants'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'

export interface Blog {
  title: string
  description: string
  imageUrl: string
  date: string
}

const BLOG_DATA: Blog[] = [
  {
    title: 'The Secrets of Screenwriting',
    description:
      "Dive into the world of screenwriting and learn the tricks of the trade to make your scripts stand out. From structure to dialogue, we've got it all.",
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 15, 2025',
  },

  {
    title: 'Building Compelling Characters',
    description:
      'Discover how to create memorable characters that resonate with your audience. From protagonists to sidekicks, learn the art of character development.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 10, 2025',
  },

  {
    title: 'Crafting the Perfect Dialogue',
    description:
      'Learn the importance of crafting authentic and dynamic dialogue that keeps the audience engaged and makes your characters come to life.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 5, 2025',
  },

  {
    title: 'Crafting the Perfect Dialogue1',
    description:
      'Learn the importance of crafting authentic and dynamic dialogue that keeps the audience engaged and makes your characters come to life.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 5, 2025',
  },

  {
    title: 'Crafting the Perfect Dialogue2',
    description:
      'Learn the importance of crafting authentic and dynamic dialogue that keeps the audience engaged and makes your characters come to life.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 5, 2025',
  },

  {
    title: 'Crafting the Perfect Dialogue3',
    description:
      'Learn the importance of crafting authentic and dynamic dialogue that keeps the audience engaged and makes your characters come to life.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: 'February 5, 2025',
  },
]

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  const blog = useMemo(() => {
    return BLOG_DATA?.find((blog: Blog) => slugify(blog?.title) === slug)
  }, [slug])

  if (!blog) {
    return <p>Loading...</p>
  }

  const { title, description, imageUrl, date } = blog

  return (
    <section className='flex flex-col items-center mt-8'>
      {/* <div className='bg-blue-500 text-white text-sm px-4 py-1 mb-4'>{tag}</div> */}

      <div className='w-11/12 md:w-1/2 text-center py-4'>
        <h1 className='text-2xl xl:text-5xl lg:text-4xl md:text-3xl font-roboto'>
          {title}
        </h1>
      </div>

      <div className='w-11/12 md:w-1/2 flex items-center justify-center gap-x-6 py-2'>
        {/* <div className='flex gap-3 items-center'>
          <Image
            src=''
            alt='profile'
            width={48}
            height={48}
            className='rounded-full'
          />
          <span>UNCHAINED</span>
        </div> */}
        <h3 className='text-lg'>{date}</h3>
      </div>

      <div className='w-11/12 md:w-1/2 flex justify-center'>
        <Image
          src={imageUrl}
          alt='Title Img'
          width={800}
          height={600}
          className='max-w-full h-auto'
        />
      </div>

      <div className='w-11/12 md:w-full mt-4'>
        <div
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </section>
  )
}
