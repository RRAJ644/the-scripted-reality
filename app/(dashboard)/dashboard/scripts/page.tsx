'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const Scripts = () => {
  const [screenPlays, setScreenPlays] = useState<[]>([])
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft')

  const getScreenplays = async (status: string) => {
    try {
      const res = await axios.get(`/api/dashboard/scripts?status=${status}`)
      if (res.data.success) {
        setScreenPlays(res.data.data)
      } else {
        console.error('Failed to fetch screenplays:', res.data.message)
      }
    } catch (err) {
      console.error('Error fetching screenplays:', err)
    }
  }

  useEffect(() => {
    getScreenplays(status)
  }, [status])

  return (
    <section className='p-6'>
      <Tabs
        defaultValue='Draft'
        onValueChange={(val) => setStatus(val as 'Draft' | 'Published')}
      >
        <TabsList className='mb-4'>
          <TabsTrigger value='Draft'>Draft</TabsTrigger>
          <TabsTrigger value='Published'>Published</TabsTrigger>
        </TabsList>

        <TabsContent value='draft'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {screenPlays.map((script: any) => (
              <Card key={script._id}>
                <CardContent className='p-4'>
                  <h2 className='text-lg font-semibold'>{script.title}</h2>
                  <p className='text-sm text-muted-foreground'>
                    {script.genre}
                  </p>
                  <p className='text-xs text-gray-500 mt-2'>
                    {new Date(script.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='published'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {screenPlays.map((script: any) => (
              <Card key={script._id}>
                <CardContent className='p-4'>
                  <h2 className='text-lg font-semibold'>{script.title}</h2>
                  <p className='text-sm text-muted-foreground'>
                    {script.genre}
                  </p>
                  <p className='text-xs text-gray-500 mt-2'>
                    {new Date(script.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Scripts
