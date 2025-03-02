'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Blog {
  _id: string
  title: string
  description: string
  imageUrl: string
  status: string
  createdAt: string
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs')
        setBlogs(data.blogs)
      } catch (err) {
        console.error('Failed to fetch blogs')
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section className='h-full flex flex-col items-center p-6'>
      <div className='w-full max-w-2xl space-y-4'>
        {blogs.length === 0 ? (
          <p className='text-gray-500'>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <Card key={blog._id} className='shadow-md'>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>{blog.description}</p>
                <p className='text-sm text-gray-500 mt-2'>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className='mt-4 flex gap-2'>
                  <Button variant='outline'>
                    <Link
                      href={`/blog/${blog.title
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      Check
                    </Link>
                  </Button>
                  <Button variant='outline'>Edit</Button>
                  <Button variant='destructive'>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}

export default Blogs
