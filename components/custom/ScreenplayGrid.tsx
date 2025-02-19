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
  genre: string
}

interface ScreenplayGridProps {
  screenplays: Screenplay[]
}

export default function ScreenplayGrid({ screenplays }: ScreenplayGridProps) {
  const router = useRouter()

  return (
    <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
      {screenplays.map((item) => (
        <Card
          key={item.id}
          className='relative group w-full rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer flex flex-col'
          onClick={() => router.push(`/script/${item.id}`)}
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
