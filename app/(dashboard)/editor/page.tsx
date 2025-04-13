'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import axios from 'axios'

// Dynamically import ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

// Interface for form data
interface FormData {
  title: string
  image: string
}

const EditorContent = () => {
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug') || null

  const [content, setContent] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [isLoading, setIsLoading] = useState<boolean>(!!slug)
  const [blogId, setBlogId] = useState<string | null>(null)

  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      image: '',
    },
  })

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        try {
          const apiUrl = process.env.NEXT_FRONTEND_ENDPOINT
          console.log(apiUrl, '-----test')
          
          const response = await axios.get(`${apiUrl}/api/blogs/${slug}`)
          const data = response.data.data

          form.setValue('title', data.title)
          form.setValue('image', data.imageUrl)
          setBlogId(data._id)
          setContent(data.description)
        } catch (err) {
          console.error('Error fetching blog:', err)
        } finally {
          setIsLoading(false)
        }
      } else {
        if (typeof window !== 'undefined') {
          const storedContent = localStorage.getItem('content') || ''
          const storedTitle = localStorage.getItem('title') || ''
          const storedImage = localStorage.getItem('image') || ''

          setContent(storedContent)
          form.setValue('title', storedTitle)
          form.setValue('image', storedImage)
          setIsLoading(false)
        }
      }
    }

    loadData()
  }, [slug, form])

  useEffect(() => {
    if (!slug && typeof window !== 'undefined') {
      localStorage.setItem('content', content)
    }
  }, [content, slug])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const maxSize = 3 * 1024 * 1024 // 3MB
      if (file.size > maxSize) {
        alert('File size exceeds 3MB. Please upload a smaller image.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        form.setValue('image', imageData)
        if (!slug && typeof window !== 'undefined') {
          localStorage.setItem('image', imageData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      const apiUrl = process.env.NEXT_FRONTEND_ENDPOINT
      const payload = {
        _id: blogId,
        title: data.title,
        imageUrl: data.image,
        description: content,
        status: 'draft',
      }

      if (slug) {
        await axios.put(`${apiUrl}/api/blogs`, payload)
        alert('Blog updated successfully!')
      } else {
        const response = await axios.post(`${apiUrl}/api/blogs`, payload)
        if (response.status === 201) {
          alert('Blog saved successfully!')
          if (typeof window !== 'undefined') {
            localStorage.removeItem('title')
            localStorage.removeItem('image')
            localStorage.removeItem('content')
          }
        }
      }

      form.reset()
      setContent('')
    } catch (error) {
      console.error('Error submitting blog:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const removeImage = () => {
    form.setValue('image', '')
    if (!slug && typeof window !== 'undefined') {
      localStorage.removeItem('image')
    }
  }

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='animate-spin h-10 w-10 border-4 border-t-transparent border-black rounded-full' />
      </div>
    )
  }

  return (
    <section className='w-full h-full flex flex-col items-center px-6 py-6'>
      <Tabs
        value={activeTab}
        className='w-full bg-white border-gray-200 rounded-xl'
        onValueChange={(value) => setActiveTab(value as 'write' | 'preview')}
      >
        <TabsList className='w-full max-w-3xl flex gap-x-4 items-center justify-center mx-auto bg-gray-100 overflow-hidden rounded-xl h-16 px-3'>
          <TabsTrigger
            value='write'
            className='flex-1 text-gray-700 text-xl border border-gray-400 font-medium data-[state=active]:bg-neutral-800 data-[state=active]:text-white rounded-xl py-2'
          >
            Write
          </TabsTrigger>
          <TabsTrigger
            value='preview'
            className='flex-1 text-gray-700 text-xl border border-gray-400 font-medium data-[state=active]:bg-neutral-800 data-[state=active]:text-white rounded-xl py-2'
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value='write'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter title...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='image'
                render={() => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('image') && (
                <div className='relative w-fit'>
                  <img
                    src={form.watch('image')}
                    alt='Uploaded'
                    className='max-w-3xl rounded-lg shadow'
                  />
                  <Button
                    type='button'
                    onClick={removeImage}
                    className='absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700'
                  >
                    Remove
                  </Button>
                </div>
              )}

              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder='Write your blog post here...'
              />
              <Button
                type='submit'
                className='w-fit bg-neutral-800 text-white rounded-xl py-2 hover:text-white hover:bg-neutral-800'
              >
                {slug ? 'Update' : 'Save'}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value='preview'>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

const Editor = () => {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  )
}

export default Editor
