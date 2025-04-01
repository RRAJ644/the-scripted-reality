import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/custom/Navbar'
import Footer from '@/components/custom/Footer'
import AuthProvider from '@/context/AuthProvider'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

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
    <AuthProvider>
      <html lang='en'>
        <body
          className={`${''} ${''} antialiased text-neutral-800-700 dark:text-zinc-200`}
        >
          <Navbar />
          <main className='min-h-screen overflow-hidden'>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
