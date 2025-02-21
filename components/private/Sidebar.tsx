import { FileText, PenTool, Archive, Lightbulb, LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface NavLink {
  name: string
  href: string
  icon: LucideIcon
}

const links: NavLink[] = [
  { name: 'Blogs', href: '/blogs', icon: FileText },
  { name: 'Scripts', href: '/scripts', icon: PenTool },
  { name: 'Drafts', href: '/drafts', icon: Archive },
  { name: 'Ideas', href: '/ideas', icon: Lightbulb },
]

export default function Sidebar() {
  return (
    <aside className='w-56 h-screen border-2 text-neutral-900  px-4 py-6 sticky top-0'>
      <nav className='space-y-3'>
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className='flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-900 transition text-lg'
          >
            <Icon size={25} />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
