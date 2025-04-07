'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Script = {
  _id: string
  title: string
  genre: string
  createdAt: string
}

const Scripts = () => {
  const [screenPlays, setScreenPlays] = useState<Script[]>([])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

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

  const handleStatusChange = async (
    id: string,
    newStatus: 'draft' | 'published'
  ) => {
    try {
      const res = await axios.put('/api/dashboard/scripts', {
        _id: id,
        status: newStatus,
      })

      if (res.data.success) {
        getScreenplays(status)
      } else {
        console.error('Status update failed:', res.data.message)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  useEffect(() => {
    getScreenplays(status)
  }, [status])

  // const renderScripts = () => (
  //   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
  //     {screenPlays.length > 0 ? (
  //       screenPlays.map((script) => (
  //         <Link href={`/dashboard/scripts/${script._id}`} key={script._id}>
  //           <Card className='hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-muted'>
  //             <CardContent className='p-5'>
  //               <h2 className='text-xl font-semibold line-clamp-1 mb-1'>
  //                 {script.title}
  //               </h2>
  //               <p className='text-sm text-muted-foreground line-clamp-1'>
  //                 {script.genre}
  //               </p>
  //               <p className='text-xs text-gray-500 mt-3'>
  //                 {new Date(script.createdAt).toLocaleDateString(undefined, {
  //                   day: 'numeric',
  //                   month: 'short',
  //                   year: 'numeric',
  //                 })}
  //               </p>
  //             </CardContent>
  //             <Button
  //               variant='outline'
  //               size='sm'
  //               className=''
  //               onClick={(e) => {
  //                 e.preventDefault()
  //                 handleStatusChange(
  //                   script._id,
  //                   status === 'draft' ? 'published' : 'draft'
  //                 )
  //               }}
  //             >
  //               {status === 'draft' ? 'Publish' : 'Revert to Draft'}
  //             </Button>
  //           </Card>
  //         </Link>
  //       ))
  //     ) : (
  //       <p className='text-center text-muted-foreground col-span-full'>
  //         No scripts found for this status.
  //       </p>
  //     )}
  //   </div>
  // )

  const renderScripts = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {screenPlays.length > 0 ? (
        screenPlays.map((script) => (
          <Link href={`/dashboard/scripts/${script._id}`} key={script._id}>
            <Card className='group hover:shadow-xl transition duration-300 cursor-pointer border border-border rounded-2xl overflow-hidden'>
              <div className='flex flex-col justify-between h-full divide-y divide-border'>
                <CardContent className='p-5 space-y-2'>
                  <h2 className='text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors'>
                    {script.title}
                  </h2>
                  <p className='text-sm text-muted-foreground line-clamp-1'>
                    {script.genre}
                  </p>
                  <p className='text-xs text-gray-500 pt-2'>
                    {new Date(script.createdAt).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </CardContent>
                <div className='p-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full'
                    onClick={(e) => {
                      e.preventDefault()
                      handleStatusChange(
                        script._id,
                        status === 'draft' ? 'published' : 'draft'
                      )
                    }}
                  >
                    {status === 'draft' ? 'Publish' : 'Revert to Draft'}
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <p className='text-center text-muted-foreground col-span-full'>
          No scripts found for this status.
        </p>
      )}
    </div>
  )

  return (
    <section className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Scripts</h1>

      <Tabs
        defaultValue='draft'
        onValueChange={(val) => setStatus(val as 'draft' | 'published')}
      >
        <TabsList className='bg-muted w-fit rounded-lg mb-6'>
          <TabsTrigger value='draft'>Draft</TabsTrigger>
          <TabsTrigger value='published'>Published</TabsTrigger>
        </TabsList>

        <TabsContent value='draft'>{renderScripts()}</TabsContent>
        <TabsContent value='published'>{renderScripts()}</TabsContent>
      </Tabs>
    </section>
  )
}

export default Scripts
