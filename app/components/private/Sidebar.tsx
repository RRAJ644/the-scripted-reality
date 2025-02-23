'use client'

import {
  LucideIcon,
  FileText,
  ScrollText,
  Pencil,
  Lightbulb,
  Edit,
} from 'lucide-react'
import Link from 'next/link'

interface NavLink {
  name: string
  onClick?: () => void
  icon: LucideIcon
  href: string
}

const links: NavLink[] = [
  {
    name: 'Editor',
    onClick: () => console.log('Ideas clicked'),
    icon: Edit,
    href: '/editor',
  },
  {
    name: 'Thoughts',
    onClick: () => console.log('thoughts clicked'),
    icon: Lightbulb,
    href: '/thoughts',
  },
  {
    name: 'Drafts',
    onClick: () => console.log('Drafts clicked'),
    icon: Pencil,
    href: '/drafts',
  },
  {
    name: 'Blogs',
    onClick: () => console.log('Blogs clicked'),
    icon: FileText,
    href: '/dashboard/blogs',
  },
  {
    name: 'Scripts',
    onClick: () => console.log('Scripts clicked'),
    icon: ScrollText,
    href: '/dashboard/scripts',
  },
]

export default function Sidebar() {
  return (
    <aside className='w-56 h-screen border-2 text-neutral-900 px-4 py-6 sticky top-0'>
      <nav>
        <ul className='space-y-4'>
          {links.map(({ name, onClick, href,  icon: Icon }) => (
            <Link
              href={href}
              key={name}
              className='cursor-pointer list-none flex items-center justify-center gap-4 text-xl border-b-2 py-3'
              role='link'
              onClick={onClick}
            >
              <Icon size={25} />
              {name}
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
