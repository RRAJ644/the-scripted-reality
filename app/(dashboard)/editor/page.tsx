'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const Editor: React.FC = () => {
  const quillRef = useRef<Quill | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [content, setContent] = useState('')

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

      quillRef.current.on('text-change', () => {
        setContent(quillRef.current?.root.innerHTML || '')
      })
    }

    return () => {
      quillRef.current = null
    }
  }, [])

  return (
    <section className='w-full h-full flex flex-col items-center px-6 py-6'>
      <Tabs
        defaultValue='write'
        className='w-full bg-white border-gray-200 rounded-xl'
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

        <TabsContent value='write' key='write'>
          <div ref={editorRef} className='' />
        </TabsContent>

        <TabsContent value='preview' key='preview'>
          <div
            className='prose'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Editor
