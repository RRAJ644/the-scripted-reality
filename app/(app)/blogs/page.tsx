import axios from 'axios'
import { IBlog } from '@/models/Blog'
import BlogCard from '@/components/custom/BlogCard'
import { Loader } from '@/components/custom/Loader'

const NEXT_FRONTEND_ENDPOINT =
  process.env.NEXT_FRONTEND_ENDPOINT || 'http://localhost:3000/'

const Blogs = async () => {
  let blogs: IBlog[] = []

  try {
    const res = await axios.get(
      `${NEXT_FRONTEND_ENDPOINT}api/blogs?status=published`
    )
    blogs = res.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }

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

      {blogs.length === 0 ? (
        <Loader />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full h-full mt-10'>
          {blogs?.map((blog: any) => (
            <BlogCard key={blog._id?.toString()} blog={blog} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Blogs
