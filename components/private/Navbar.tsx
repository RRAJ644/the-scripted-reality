'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='w-full top-0 z-50 shadow-sm text-xl bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center h-16'>
        <Link
          target='_blank'
          href={'/'}
          className='text-2xl font-normal cursor-pointer tracking-wide text-gray-800 dark:text-white'
        >
          The-Scripted-Reality
        </Link>

        {session && (
          <button
            onClick={() => signOut()}
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
