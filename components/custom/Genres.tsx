'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Book,
  Brain,
  Heart,
  Laugh,
  Tv,
  Zap,
  Search,
  Wand,
  Rocket,
  Ghost,
  Shield,
  Compass,
  History,
  Film,
  Music,
  Camera,
  Home,
  User,
  Sword,
  Users,
  Feather,
  // HatWizard,
  BrainCircuit,
  Eye,
  WandSparkles,
} from 'lucide-react'
import PointerTooltip from './PointerTooltip'
import Link from 'next/link'

const genres = [
  {
    icon: <Book className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Crime',
    description:
      'Focuses on criminal activities, investigations, and the pursuit of justice.',
  },
  {
    icon: <Brain className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Psychological',
    description:
      'Delves into the complexities of the human mind with psychological twists.',
  },
  {
    icon: <Heart className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Romance',
    description: 'Centers around love stories and emotional relationships.',
  },
  {
    icon: <Laugh className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'RomCom',
    description: 'A light-hearted genre combining romance with humor.',
  },
  {
    icon: <Tv className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'SitCom',
    description:
      'Humor derived from everyday situations with recurring characters.',
  },
  {
    icon: <Zap className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Thriller',
    description: 'Suspenseful stories with unexpected twists and high stakes.',
  },
  {
    icon: <Search className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Mystery',
    description: 'Revolves around solving a puzzle or crime.',
  },
  {
    icon: <Wand className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Fantasy',
    description:
      'Features magical elements, mythical creatures, and imaginary worlds.',
  },
  {
    icon: <Rocket className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Sci-Fi',
    description:
      'Explores futuristic technology and advanced scientific possibilities.',
  },
  {
    icon: <Ghost className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Horror',
    description: 'Evokes fear through supernatural or psychological terror.',
  },
  {
    icon: <Shield className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Action',
    description:
      'Physical feats, chases, and combat with heroes overcoming obstacles.',
  },
  {
    icon: <Compass className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Adventure',
    description: 'Epic journeys, quests, and exploration.',
  },
  {
    icon: <History className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Historical',
    description: 'Stories based on real historical events or time periods.',
  },
  {
    icon: <Film className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Drama',
    description: 'Emotional narratives with realistic life situations.',
  },
  {
    icon: <Music className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Musical',
    description: 'Stories integrated with songs and dance.',
  },
  {
    icon: <Camera className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Documentary',
    description: 'Factual information about real-life subjects.',
  },
  {
    icon: <Home className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Slice of Life',
    description: 'Everyday experiences and relatable moments.',
  },
  {
    icon: <Sword className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Action-Comedy',
    description: 'Action sequences balanced with humor.',
  },
  {
    icon: (
      <WandSparkles className='w-10 h-10 text-gray-700 dark:text-gray-100' />
    ),
    title: 'Superhero',
    description: 'Heroes with extraordinary abilities fighting villains.',
  },
  {
    icon: <Users className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Family',
    description: 'Wholesome content for audiences of all ages.',
  },
  {
    icon: <User className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Coming-of-Age',
    description: 'Character growth from youth to adulthood.',
  },
  {
    icon: <Eye className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Noir',
    description: 'Dark and cynical crime stories.',
  },
  {
    icon: <Feather className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Western',
    description: 'Stories set in the American frontier.',
  },
  {
    icon: (
      <BrainCircuit className='w-10 h-10 text-gray-700 dark:text-gray-100' />
    ),
    title: 'Psychological Thriller',
    description: 'Suspense with psychological elements.',
  },
  {
    icon: <Eye className='w-10 h-10 text-gray-700 dark:text-gray-100' />,
    title: 'Satire',
    description: 'Humor and irony to critique societal norms.',
  },
]

const Genres = () => {
  const [tooltipText, setTooltipText] = useState<string | null>(null)

  return (
    <section className='py-16 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto text-center mb-12'>
        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text mb-4'>
          Discover Popular Entertainment Genres
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300'>
          Explore a wide range of entertainment genres, from action-packed
          thrillers to heartwarming romances. Find your next favorite show,
          movie, or book here!
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {genres.map((genre, index) => {
          const url = `http://localhost:3000/read/${genre.title.toLowerCase()}`
          return (
            <Link href={url} target='_blank' key={index}>
              <Card
                className='group cursor-pointer border border-zinc-400 dark:border-zinc-600 backdrop-blur-lg bg-gradient-to-br from-white/60 to-gray-100/60 dark:from-zinc-900/60 dark:to-zinc-800/60 rounded-3xl hover:scale-105 hover:-rotate-1 transition-transform duration-500 hover:shadow-xl'
                onMouseEnter={() => setTooltipText(url)}
                onMouseLeave={() => setTooltipText(null)}
              >
                <CardHeader className='flex items-center justify-center pb-2'>
                  {genre.icon}
                </CardHeader>
                <CardContent className='text-center'>
                  <CardTitle className='mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100'>
                    {genre.title}
                  </CardTitle>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {genre.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      <PointerTooltip text={tooltipText} />
    </section>
  )
}

export default Genres
