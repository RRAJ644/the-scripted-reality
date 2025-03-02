import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/custom/Navbar'
import Footer from '@/components/custom/Footer'
import AuthProvider from '@/context/AuthProvider'

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
  description: 'Screenwriters chasing projects with the mind blowing scripts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-800-700 dark:text-zinc-200`}
        >
          <Navbar />
          <main className='min-h-screen'>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
