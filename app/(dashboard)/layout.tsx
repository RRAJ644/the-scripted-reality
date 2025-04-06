import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import AuthProvider from '@/context/AuthProvider'
import Navbar from '@/components/private/Navbar'
import Sidebar from '@/components/private/Sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TheScriptedReality - We Write Scripts',
  description: 'Screenwriters chasing projects with the mind-blowing scripts',
}
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang='en' className='h-full'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 dark:text-zinc-200 min-h-screen`}
        >
          <Navbar />
          <Sidebar />
          <main className='flex min-h-screen ml-56'>
            <div className='flex-1 overflow-y-auto'>{children}</div>
          </main>
        </body>
      </html>
    </AuthProvider>
  )
}
