import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/custom/Navbar'
import Footer from '@/components/custom/Footer'
import AuthProvider from '@/context/AuthProvider'

export const metadata: Metadata = {
  title: 'The Scripted Reality - Elevating Cinematic Storytelling',
  description:
    'A hub for compelling screenplays, scriptwriting, and cinematic blogs. Showcasing top-tier writing to captivate film studios, production houses, and brands.',
  keywords: [
    'screenplays',
    'scriptwriting',
    'cinematic storytelling',
    'film studios',
    'production houses',
    'scripted reality',
    'Fictional Stories',
    'Stories live here',
  ],
  alternates: {
    canonical: 'https://www.thescriptedreality.com/',
  },
  openGraph: {
    title: 'The Scripted Reality - Elevating Cinematic Storytelling',
    description:
      'A hub for compelling screenplays, scriptwriting, and cinematic blogs.',
    url: 'https://www.thescriptedreality.com/',
    type: 'website',
    images: [
      {
        url: 'https://www.thescriptedreality.com/_next/image?url=%2Flogo.webp&w=256&q=75',
        width: 300,
        height: 250,
        alt: 'The Scripted Reality Cover Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scripted Reality - Elevating Cinematic Storytelling',
    description:
      'A hub for compelling screenplays, scriptwriting, and cinematic blogs.',
    images: ['https://www.thescriptedreality.com/logo.webp'],
  },

  icons: {
    icon: 'https://www.thescriptedreality.com/logo.webp',
  },
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
