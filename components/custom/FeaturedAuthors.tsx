import React from 'react'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'

interface Author {
  name: string
  bio: string
  image: string
}

const authors: Author[] = [
  {
    name: 'Jane Smith',
    bio: 'Tech writer and blockchain enthusiast.',
    image:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
  },
  {
    name: 'John Doe',
    bio: 'Web developer and tech blogger.',
    image:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
  },
  {
    name: 'Alice Johnson',
    bio: 'AI researcher and writer.',
    image:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
  },
  {
    name: 'Bob Williams',
    bio: 'Crypto analyst and fintech specialist.',
    image:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
  },
]

const FeaturedAuthors: React.FC = () => {
  return (
    <section className='flex flex-col items-center justify-center text-center gap-y-12 w-full h-full'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-5xl font-extrabold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-xl'>
          Meet Our Featured Authors
        </h2>
        <p className='mt-5 text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
          Discover inspiring voices and brilliant minds who share their
          knowledge on blockchain, web development, AI, and more.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full h-full px-56 gap-10'>
        {authors.map((author, index) => (
          <Card
            key={index}
            className='w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg'
          >
            <AspectRatio ratio={5 / 3} className='bg-muted'>
              <Image
                src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                alt='Photo by Drew Beamer'
                fill
                className='h-full w-full rounded-md object-cover'
              />
            </AspectRatio>

            <CardContent className='p-6 flex justify-center items-center flex-col space-y-4'>
              <CardTitle className='text-2xl font-semibold text-gray-900 dark:text-white'>
                {author.name}
              </CardTitle>
              <CardDescription className='text-sm text-gray-600 dark:text-gray-400'>
                {author.bio}
              </CardDescription>
              <div className='mt-4'>
                <Badge className='bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-medium'>
                  Featured Author
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedAuthors
