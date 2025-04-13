import { Loader } from '@/components/custom/Loader'
import Image from 'next/image'

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
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/blogs/${slug}`,
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

  if (!blog) return <Loader />

  return (
    <section className='flex flex-col items-center px-4 mt-8 space-y-8'>
      <div className='text-center space-y-3'>
        <h1 className='text-3xl md:text-5xl font-semibold'>{blog.title}</h1>
        <p className='text-gray-500 text-sm'>
          Written on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
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

      <article className='w-full prose prose-lg dark:prose-invert md:text-xl max-lg:text-lg max-w-7xl'>
        <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
      </article>
    </section>
  )
}

export default Read
