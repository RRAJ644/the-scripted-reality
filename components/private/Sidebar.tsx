'use client'
import { useSession } from 'next-auth/react'
import { LucideIcon, FileText, ScrollText, Pencil, Edit } from 'lucide-react'
import Link from 'next/link'

interface NavLink {
  name: string
  onClick?: () => void
  icon: LucideIcon
  href: string
}

const allLinks: NavLink[] = [
  {
    name: 'Blog Editor',
    icon: Edit,
    href: '/editor',
  },

  {
    name: 'Drafts',
    icon: Pencil,
    href: '/drafts',
  },

  {
    name: 'Blogs',
    icon: FileText,
    href: '/dashboard/blogs',
  },

  {
    name: 'Script Editor',
    icon: ScrollText,
    href: '/dashboard/scripts/editor',
  },

  {
    name: 'Scripts',
    icon: ScrollText,
    href: '/dashboard/scripts',
  },
]

export default function Sidebar() {
  const { data: session } = useSession()
  const role = session?.user?.role

  // Filter links based on role
  const links =
    role === 'superadmin'
      ? allLinks
      : allLinks.filter((link) => link.name === 'Thoughts')

  return (
    <aside className='w-56 h-[calc(100vh-3.5rem)] fixed top-[3.5rem] left-0 border-r border-neutral-500 text-neutral-900 px-4 py-6'>
      <ul className='w-full'>
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            href={href}
            key={name}
            className='cursor-pointer list-none flex items-center justify-start gap-4 text-xl border-b-2 border-neutral-400 py-3'
            role='link'
          >
            <Icon size={25} />
            {name}
          </Link>
        ))}
      </ul>
    </aside>
  )
}
