import { slugify } from '@/lib/constants'
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = BLOG_DATA.find((blog) => slugify(blog.title) === params.slug)

  if (!blog) {
    return { title: 'Blog Not Found', description: 'This blog does not exist.' }
  }

  return {
    title: `${blog.title} | Your Blog Name`,
    description: blog.description,
    openGraph: {
      type: 'article',
      url: `https://yourwebsite.com/blog/${params.slug}`,
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.imageUrl, width: 800, height: 600 }],
      publishedTime: blog.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl],
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = BLOG_DATA.find((blog) => slugify(blog.title) === params.slug)

  if (!blog) {
    return notFound()
  }

  const { title, description, imageUrl, date } = blog

  return (
    <section className='flex flex-col items-center mt-8'>
      <div className='w-11/12 md:w-1/2 text-center py-4'>
        <h1 className='text-2xl xl:text-5xl lg:text-4xl md:text-3xl font-roboto'>
          {title}
        </h1>
      </div>

      <div className='w-11/12 md:w-1/2 flex items-center justify-center gap-x-6 py-2'>
        <h3 className='text-lg'>{new Date(date).toDateString()}</h3>
      </div>

      <div className='w-11/12 md:w-1/2 flex justify-center'>
        <Image
          src={imageUrl}
          alt={title}
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
