'use client'

import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession()

  return (
    <section className='w-full h-full flex flex-col justify-start items-center text-center px-6 mt-6'>
      {session?.user ? (
        <div className='flex flex-col gap-y-4 justify-center items-center'>
          <h1 className='text-5xl font-semibold'>
            Welcome, {session.user.name}!
          </h1>
          <p className='text-neutral-800 dark:text-neutral-300 text-xl max-w-4xl leading-relaxed'>
            Let's build something amazing together—where creativity,
            collaboration, and passion for storytelling come alive. From
            screenwriting to cinema, books to thought-provoking ideas, this
            platform is where art thrives.
          </p>
        </div>
      ) : (
        <h1 className='text-xl text-gray-500'>Loading...</h1>
      )}
    </section>
  )
}

export default Dashboard
