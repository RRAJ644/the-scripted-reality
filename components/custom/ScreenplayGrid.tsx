'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface Screenplay {
  id: string
  title: string
  description: string
  imageUrl: string
  hoverGif: string
}

const screenplays: Screenplay[] = [
  {
    id: '1',
    title: 'The Mystery Manor',
    description: 'A thrilling suspense screenplay.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif:
      'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif',
  },
  {
    id: '2',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
  {
    id: '3',
    title: 'The Mystery Manor',
    description: 'A thrilling suspense screenplay.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif:
      'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif',
  },
  {
    id: '4',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
  {
    id: '5',
    title: 'The Mystery Manor',
    description: 'A thrilling suspense screenplay.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif:
      'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif',
  },
  {
    id: '6',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
  {
    id: '7',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },

  {
    id: '8',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
  {
    id: '9',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },

  {
    id: '10',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
  {
    id: '11',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  },
]

export default function ScreenplayGrid() {
  const router = useRouter()

  return (
    <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
      {screenplays.map((item) => (
        <Card
          key={item.id}
          className='relative group w-full rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer flex flex-col gap-y-'
          onClick={() => router.push(`/read/${item.id}`)}
        >
          <AspectRatio ratio={16 / 9} className='relative'>
            <Image
              src={item.imageUrl}
              alt={item.title}
              layout='fill'
              objectFit='cover'
              className='transition-opacity duration-500 group-hover:opacity-0'
            />
          </AspectRatio>
          <Image
            src={item.hoverGif}
            alt={`${item.title} hover`}
            layout='fill'
            objectFit='cover'
            className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'
          />
          <div className='flex flex-col gap-y-3 items-center justify-center py-4'>
            <h3 className='text-xl font-semibold text-neutral-800'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-400'>{item.description}</p>
          </div>
        </Card>
      ))}
    </section>
  )
}
