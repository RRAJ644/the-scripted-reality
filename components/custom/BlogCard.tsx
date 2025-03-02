import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui/card'
import { AspectRatio } from '../ui/aspect-ratio'
import { Button } from '../ui/button'
import Link from 'next/link'
import { slugify } from '@/lib/constants'

interface Blog {
  title: string
  description: string
  imageUrl: string
  date: string
}

interface BlogCardProps {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const slug = slugify(blog.title)

  return (
    <Link href={`/blog/${slug}`}>
      <Card className='w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between gap-y-2 cursor-pointer'>
        <div className='relative'>
          <AspectRatio ratio={16 / 9} className='w-full'>
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout='fill'
              objectFit='cover'
            />
          </AspectRatio>
        </div>

        <div className='flex flex-col justify-between w-full h-full p-4 gap-y-4'>
          <h3 className='text-xl font-semibold text-gray-900 truncate'>
            {blog.title}
          </h3>

          <p
            className='text-sm text-gray-600 line-clamp-3'
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></p>

          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-500'>{blog.date}</p>

            <Button
              variant='outline'
              className='flex items-center justify-between text-sm text-gray-700 rounded-3xl'
            >
              <span>Read More</span>
              <ArrowRight className='w-4 h-4 text-gray-700' />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BlogCard
