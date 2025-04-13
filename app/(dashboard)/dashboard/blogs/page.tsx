'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Blog {
  _id: string
  title: string
  description: string
  imageUrl: string
  status: string
  slug: string
  createdAt: string
}

const Loader = ({ size = 28 }: { size?: number }) => (
  <div
    className='border-4 border-t-transparent border-neutral-900 rounded-full animate-spin'
    style={{ width: size, height: size }}
  />
)

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [loading, setLoading] = useState(false)

  const fetchBlogs = async (status: 'draft' | 'published') => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/blogs?status=${status}`)
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs(status)
  }, [status])

  const handleDelete = async (slug: string) => {
    try {
      const response = await axios.delete(`/api/blogs/${slug.trim()}`)
      if (response.status === 200) {
        await fetchBlogs('draft')
      }
    } catch (error) {
      console.error('Failed to delete blog')
    }
  }

  const handlePublish = async (slug: string) => {
    try {
      const response = await axios.put(`/api/blogs/${slug.trim()}`)
      if (response.status === 200) {
        await fetchBlogs('published')
      }
    } catch (error) {
      console.error('Failed to publish blog')
    }
  }

  return (
    <section className='h-full flex flex-col items-center p-6'>
      <div className='w-full max-w-3xl'>
        <Tabs
          defaultValue='draft'
          onValueChange={(val) => setStatus(val as 'draft' | 'published')}
        >
          <TabsList className='w-full flex justify-center mb-6'>
            <TabsTrigger value='draft' className='w-full'>
              Drafts
            </TabsTrigger>
            <TabsTrigger value='published' className='w-full'>
              Published
            </TabsTrigger>
          </TabsList>

          <TabsContent value='draft'>
            {loading ? (
              <div className='flex justify-center py-10'>
                <Loader />
              </div>
            ) : (
              <BlogList
                blogs={blogs}
                handleDelete={handleDelete}
                handlePublish={handlePublish}
                isDraft={true}
              />
            )}
          </TabsContent>

          <TabsContent value='published'>
            {loading ? (
              <div className='flex justify-center py-10'>
                <Loader />
              </div>
            ) : (
              <BlogList
                blogs={blogs}
                handleDelete={handleDelete}
                handlePublish={handlePublish}
                isDraft={false}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const BlogList = ({
  blogs,
  handleDelete,
  handlePublish,
  isDraft,
}: {
  blogs: Blog[]
  handleDelete: (id: string) => void
  handlePublish: (id: string) => void
  isDraft: boolean
}) => {
  if (blogs.length === 0) {
    return <p className='text-gray-500'>No blogs found.</p>
  }

  return (
    <div className='space-y-4'>
      {blogs?.map((blog: any) => (
        <Card key={blog._id} className='shadow-md'>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className='text-gray-600'
              dangerouslySetInnerHTML={{ __html: blog.description }}
            ></p>
            <p className='text-sm text-gray-500 mt-2'>
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className='mt-4 flex flex-wrap gap-2'>
              <Button
                variant='outline'
                className='bg-neutral-900 text-white rounded-xl'
              >
                <Link href={`/blogs/${blog?.slug}`}>Check</Link>
              </Button>
              <Button
                variant='outline'
                className='bg-neutral-900 text-white rounded-xl'
              >
                <Link href={`/editor?slug=${blog.slug}`}>Edit</Link>
              </Button>
              <Button
                variant='outline'
                className='bg-neutral-900 text-white rounded-xl hover:bg-transparent'
                onClick={() => handleDelete(blog?.slug)}
              >
                Delete
              </Button>
              {isDraft && (
                <Button
                  variant='outline'
                  className='bg-neutral-900 text-white rounded-xl hover:bg-transparent'
                  onClick={() => handlePublish(blog.slug)}
                >
                  Publish
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Blogs
