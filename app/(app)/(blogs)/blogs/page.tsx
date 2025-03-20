'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/custom/BlogCard'
import type { Metadata } from 'next'

export interface BlogCardConfig {
  title: string
  description: string
  imageUrl: string
  createdAt: string
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogCardConfig[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?status=Published')
        if (!response.ok) throw new Error('Failed to fetch blogs')

        const data = await response.json()

        setBlogs(data?.blogs)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section className='flex flex-col items-center justify-center px-6 md:px-12 text-center mt-14'>
      <div className='max-w-6xl flex flex-col'>
        <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md py-2'>
          Unlock the Secrets of Scriptwriting: Tips, Techniques, and Insights
        </h1>
        <p className='mt-5 text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto'>
          From rookie scribbler to seasoned script wizard, unlock the secrets of
          storytelling. Master the craft of creating characters who leap off the
          page and plots that twist, turn, and captivate audiences on screen.
        </p>
      </div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </section>
  )
}

export default Blog
