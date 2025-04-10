import Image from 'next/image'
import { notFound } from 'next/navigation'

interface BlogData {
  title: string
  imageUrl: string
  author: string
  date: string
  description: string
  createdAt: string
}

const fetchBlogBySlug = async (slug: string): Promise<BlogData | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_FRONTEND_ENDPOINT}/api/blogs/${slug}`,
      {
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  } catch (err) {
    console.error('Error fetching blog:', err)
    return null
  }
}

type paramsType = Promise<{ slug: string }>

const Read = async ({ params }: { params: paramsType }) => {
  const { slug } = await params
  const blog = await fetchBlogBySlug(slug)

  if (!blog) return notFound()

  return (
    <section className='flex flex-col items-center px-4 mt-8 space-y-8'>
      <div className='text-center space-y-3'>
        <h1 className='text-3xl md:text-5xl font-semibold'>{blog.title}</h1>
        <p className='text-gray-500 text-sm'>Written on {blog.createdAt}</p>
      </div>

      <div className='w-full max-w-4xl'>
        <Image
          src={blog.imageUrl || '/fallback.jpg'}
          alt={blog.title}
          width={900}
          height={500}
          className='rounded-lg object-cover w-full h-auto'
        />
      </div>

      <article className='prose prose-lg dark:prose-invert max-w-4xl'>
        <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
      </article>
    </section>
  )
}

export default Read
