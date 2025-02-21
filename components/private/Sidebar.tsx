'use client'

import { Button } from '@/components/ui/button'
import {
  LucideIcon,
  FileText,
  ScrollText,
  Pencil,
  Lightbulb,
} from 'lucide-react'

interface NavLink {
  name: string
  onClick?: () => void
  icon: LucideIcon
}

const links: NavLink[] = [
  {
    name: 'Blogs',
    onClick: () => console.log('Blogs clicked'),
    icon: FileText,
  },
  {
    name: 'Scripts',
    onClick: () => console.log('Scripts clicked'),
    icon: ScrollText,
  },
  {
    name: 'Drafts',
    onClick: () => console.log('Drafts clicked'),
    icon: Pencil,
  },
  {
    name: 'Ideas',
    onClick: () => console.log('Ideas clicked'),
    icon: Lightbulb,
  },
]

export default function Sidebar() {
  return (
    <aside className='w-56 h-screen border-2 text-neutral-900 px-4 py-6 sticky top-0'>
      <nav>
        <ul className='space-y-4'>
          {links.map(({ name, onClick, icon: Icon }) => (
            <li
              key={name}
              className='list-none flex items-center justify-center gap-4 text-2xl border-b-2 py-3'
              role='link'
            >
              <Icon size={30} />
              {name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
