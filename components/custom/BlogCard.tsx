import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Blog = {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  slug: string
}

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog?.slug}`} target='_blank'>
      <Card className='group flex flex-col h-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900'>
        <div className='relative w-full aspect-[16/9] overflow-hidden'>
          <Image
            src={blog?.imageUrl}
            alt={blog?.title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90 rounded-t-2xl'
          />
        </div>

        <CardContent className='flex-1 p-6 flex flex-col items-center justify-center text-center gap-6'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-2xl font-semibold text-neutral-800 leading-snug line-clamp-2'>
              {blog?.title}
            </h3>

            <article className='prose prose-lg dark:prose-invert max-w-4xl line-clamp-2'>
              <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
            </article>
          </div>

          <Button
            variant='default'
            className='text-lg text-center border-2 border-neutral-800 rounded-xl'
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogCard
