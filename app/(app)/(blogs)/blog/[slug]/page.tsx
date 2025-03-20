import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
      'Learn the tricks of the trade to make your scripts stand out.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: '2025-02-15',
  },
  {
    title: 'Building Compelling Characters',
    description: 'Create memorable characters that resonate with audiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
    date: '2025-02-10',
  },
]

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params

  const blog = BLOG_DATA.find(
    (b) => b.title.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!blog) {
    return { title: 'Blog Not Found', description: 'This blog does not exist.' }
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.imageUrl, width: 800, height: 600 }],
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {

  const { slug } = await params

  console.log(slug, '====slug')

  
  const blog = BLOG_DATA.find(
    (b) => b.title.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!blog) return notFound()

  console.log(blog, '=====blog')

  return (
    <section className='flex flex-col items-center mt-8'>
      <div className='w-11/12 md:w-1/2 text-center py-4'>
        <h1 className='text-2xl xl:text-5xl font-roboto'>{blog.title}</h1>
      </div>
      <div className='w-11/12 md:w-1/2 flex justify-center'>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={800}
          height={600}
          className='max-w-full h-auto rounded-lg'
        />
      </div>
      <div className='w-11/12 md:w-full mt-4'>
        <p
          className='max-w-7xl mx-auto px-4 text-lg'
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></p>
      </div>
    </section>
  )
}
