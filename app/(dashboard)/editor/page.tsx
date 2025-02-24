'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form'
import { useForm } from 'react-hook-form'
import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const Editor: React.FC = () => {
  const quillRef = useRef<Quill | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const form = useForm({
    defaultValues: {
      title: localStorage.getItem('title') || '',
      image: localStorage.getItem('image') || '',
    },
  })

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Write your blog post here...',
      })

      quillRef.current.root.innerHTML = localStorage.getItem('content') || ''

      quillRef.current.on('text-change', () => {
        const newContent = quillRef.current?.root.innerHTML || ''
        localStorage.setItem('content', newContent)
      })
    }
  }, [])

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
        localStorage.setItem('image', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: any) => {
    const blogData = {
      title: data.title,
      description: quillRef.current?.root.innerHTML || '',
      imageUrl: data.image || '',
    }

    console.log(blogData, 'Saved Blog Data')
  }

  return (
    <section className='w-full h-full flex flex-col items-center px-6 py-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6'
        >
          {activeTab === 'write' && (
            <>
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
                render={({ field }) => (
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
            </>
          )}

          <Tabs
            value={activeTab}
            className='w-full bg-white border-gray-200 rounded-xl'
            onValueChange={(value) =>
              setActiveTab(value as 'write' | 'preview')
            }
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

            <TabsContent
              value='write'
              forceMount
              className={`${activeTab === 'write' ? 'block' : 'hidden'}`}
            >
              <div ref={editorRef} />
            </TabsContent>

            <TabsContent value='preview'>
              <div
                dangerouslySetInnerHTML={{
                  __html: quillRef.current?.root.innerHTML || '',
                }}
              ></div>
            </TabsContent>
          </Tabs>

          <Button
            type='submit'
            className='w-fit bg-neutral-800 text-white rounded-xl py-2 hover:text-white hover:bg-neutral-800'
          >
            Save
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default Editor
