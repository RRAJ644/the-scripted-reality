import BlogCard from '@/components/custom/BlogCard'

interface BlogCardConfig {
  title: string
  description: string
  imageUrl: string
  date: string
}

const blogCardConfig: BlogCardConfig[] = [
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

const Blog = () => {
  return (
    <section className='flex flex-col items-center justify-center px-6 md:px-12 text-center mt-28'>
      <div className='max-w-6xl flex flex-col'>
        <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md py-2'>
          Unlock the Secrets of Screenwriting: Tips, Techniques, and Insights
        </h1>
        <p className='mt-5 text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto'>
          From rookie scribbler to seasoned script wizard, unlock the secrets of
          storytelling. Master the craft of creating characters who leap off the
          page and plots that twist, turn, and captivate audiences on screen.
        </p>
      </div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {blogCardConfig.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </section>
  )
}

export default Blog
