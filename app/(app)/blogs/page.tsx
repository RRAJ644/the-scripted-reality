import { IBlog } from '@/models/Blog'
import BlogCard from '@/components/custom/BlogCard'

const NEXT_PUBLIC_BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

const fetchBlogs = async (): Promise<IBlog[]> => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_ENDPOINT}/api/blogs?status=published`,
      {
        cache: 'no-store', // 🔥 Ensures no SSR caching
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch blogs')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

const Blogs = async () => {
  const blogs = await fetchBlogs()

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-12'>
      <div className='max-w-6xl mx-auto text-center space-y-4'>
        <h1 className='max-sm:text-3xl md:text-3xl lg:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text py-1'>
          Latest Movie & Web Series Reviews, Scripts & Entertainment Insights
        </h1>
        <p className='text-lg max-sm:px-8 text-gray-700 dark:text-gray-300'>
          Discover trending reviews, expert-written scripts, and
          behind-the-scenes stories from the world of cinema, OTT shows, and TV.
        </p>
      </div>

      {blogs?.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full h-full mt-10'>
          {blogs.map((blog: any) => (
            <BlogCard key={blog._id?.toString()} blog={blog} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Blogs
