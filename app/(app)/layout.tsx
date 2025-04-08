import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/custom/Navbar'
import Footer from '@/components/custom/Footer'
import AuthProvider from '@/context/AuthProvider'

export const metadata: Metadata = {
  title: 'The Scripted Reality | Original Scripts & Cinematic Writing',
  description:
    'Discover professionally crafted film, web series, and TV show scripts. The Scripted Reality is your gateway to cinematic storytelling, screenwriting mastery, and visual narratives that captivate.',
  keywords: [
    'original scripts',
    'professional screenwriting',
    'film scripts',
    'TV scripts',
    'web series scripts',
    'script writing portfolio',
    'cinematic writing',
    'storytelling for film',
    'screenwriting samples',
    'The Scripted Reality',
    'visual storytelling',
    'scriptwriter Ritu Raj Singh',
    'hire scriptwriter',
  ],
  alternates: {
    canonical: 'https://www.thescriptedreality.com/',
  },
  openGraph: {
    title:
      'The Scripted Reality | Original Scripts & Cinematic Writing by Ritu Raj Singh',
    description:
      'Explore premium original scripts for film, TV, and digital. Elevating storytelling through immersive screenwriting.',
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
    title:
      'The Scripted Reality | Professional Scripts & Cinematic Storytelling',
    description:
      'Read original scripts written by Ritu Raj Singh. For producers, studios & creators seeking powerful visual narratives.',
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
