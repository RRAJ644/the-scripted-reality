'use client'

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
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import axios from 'axios'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const Editor: React.FC = () => {
  const [content, setContent] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const form = useForm({
    defaultValues: {
      title: '',
      image: '',
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedContent = localStorage.getItem('content') || ''
      const storedTitle = localStorage.getItem('title') || ''
      const storedImage = localStorage.getItem('image') || ''

      setContent(storedContent)
      form.setValue('title', storedTitle)
      form.setValue('image', storedImage)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('content', content)
    }
  }, [content])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const maxSize = 2 * 1024 * 1024 // 2MB limit
      if (file.size > maxSize) {
        alert('File size exceeds 2MB. Please upload a smaller image.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        form.setValue('image', imageData)
        if (typeof window !== 'undefined') {
          localStorage.setItem('image', imageData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: any) => {
    const blogData = {
      title: data.title,
      description: content,
      imageUrl: data.image || '',
      status: 'Draft',
    }

    console.log(blogData, '=-----')

    try {
      const response = await axios.post('api/blogs', blogData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Blog saved successfully:', response.data)
    } catch (error) {
      console.error('Error saving blog:', error)
    }
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
                <img
                  src={form.watch('image')}
                  alt='Uploaded'
                  className='max-w-3xl rounded-lg shadow'
                />
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
                Save1
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value='preview'>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Editor
