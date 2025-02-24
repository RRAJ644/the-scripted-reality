'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React, { useState } from 'react'

const Editor: React.FC = () => {
  return (
    <section className='w-full h-full flex flex-col items-center px-6 py-6'>
      <Tabs
        defaultValue='write'
        className='w-full bg-white border-gray-200 rounded-xl'
      >
        <TabsList className='flex max-w-3xl gap-x-2 items-center justify-center mx-auto bg-gray-100 overflow-hidden h-full rounded-xl p-2'>
          <TabsTrigger
            value='write'
            className='flex-1 text-gray-700 text-xl border border-gray-400 font-medium data-[state=active]:bg-neutral-800 data-[state=active]:text-white rounded-xl h-full py-2'
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
      </Tabs>
    </section>
  )
}

export default Editor
