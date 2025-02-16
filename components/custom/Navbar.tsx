'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: 'Our Work', href: '/work' },
    { name: 'Read', href: '/read' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
  ]

  return (
    <nav className='w-full top-0 z-50 shadow-sm text-xl bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center h-16'>
        <Link
          href={'/'}
          className='text-3xl font-extrabold cursor-pointer tracking-wide text-gray-800 dark:text-white'
        >
          ReadReality
        </Link>

        <ul className='hidden md:flex space-x-6'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className='hover:text-blue-600 transition-colors'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='md:hidden'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <X className='h-6 w-6 text-gray-800 dark:text-white' />
                ) : (
                  <Menu className='h-6 w-6 text-gray-800 dark:text-white' />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='text-neutral-900 bg-zinc-50'>
              <SheetHeader className='sr-only'>
                <SheetTitle className='text-2xl font-bold mb-6'>
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className='flex flex-col space-y-6 mt-4 text-xl'>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className='hover:text-gray-200 transition-colors'
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
