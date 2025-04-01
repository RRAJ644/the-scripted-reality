import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/custom/Navbar'
import Footer from '@/components/custom/Footer'
import AuthProvider from '@/context/AuthProvider'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: '../public/fonts/Geist-Regular.woff2',
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'The Scripted Reality - Elevating Cinematic Storytelling',
  description:
    'A hub for compelling screenplays, scriptwriting, and cinematic blogs. Showcasing top-tier writing to captivate film studios, production houses, and brands.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-800 dark:text-neutral-700 dark:text-zinc-200`}
      >
        <AuthProvider>
          <Navbar />
          <main className='min-h-screen overflow-hidden'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
