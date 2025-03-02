'use client'
import React, { useState } from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    // { name: 'Scripts', href: '/scripts' },
    // { name: 'Voice Scripts', href: '/voice-scripts' },
    { name: 'Blogs', href: '/blogs' },
    // { name: 'About', href: '/about' },
    // { name: 'Our Work', href: '/work' },
    // { name: "Let's Work", href: '/work' },
    // { name: 'Services', href: '/services' },
  ]

  return (
    <nav className='w-full top-0 z-50 shadow-sm text-xl bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center h-16'>
        <Link
          href={'/'}
          className='text-2xl font-normal cursor-pointer tracking-wide text-gray-800 dark:text-white'
        >
          The-Scripted-Reality
        </Link>

        <ul className='hidden md:flex space-x-6 justify-center items-center'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className='hover:text-neutral-900 transition-colors'
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
