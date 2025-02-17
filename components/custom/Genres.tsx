'use client'

import React, { useState, useMemo } from 'react'
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
  BrainCircuit,
  Eye,
  WandSparkles,
} from 'lucide-react'
import PointerTooltip from './PointerTooltip'
import Link from 'next/link'

const Genres = () => {
  const [tooltipText, setTooltipText] = useState<string | null>(null)

  const iconClass = 'w-10 h-10 text-gray-700 dark:text-gray-100'

  const genres = useMemo(
    () => [
      {
        icon: <Book className={iconClass} />,
        title: 'Crime',
        description: 'Criminal activities, investigations, and justice.',
      },
      {
        icon: <Brain className={iconClass} />,
        title: 'Psychological',
        description: 'Psychological twists and mind games.',
      },
      {
        icon: <Heart className={iconClass} />,
        title: 'Romance',
        description: 'Love stories and emotional journeys.',
      },
      {
        icon: <Laugh className={iconClass} />,
        title: 'RomCom',
        description: 'Romantic comedies with humor.',
      },
      {
        icon: <Tv className={iconClass} />,
        title: 'SitCom',
        description: 'Humorous everyday situations.',
      },
      {
        icon: <Zap className={iconClass} />,
        title: 'Thriller',
        description: 'Suspenseful twists and turns.',
      },
      {
        icon: <Search className={iconClass} />,
        title: 'Mystery',
        description: 'Puzzles and crime-solving.',
      },
      {
        icon: <Wand className={iconClass} />,
        title: 'Fantasy',
        description: 'Magical worlds and creatures.',
      },
      {
        icon: <Rocket className={iconClass} />,
        title: 'Sci-Fi',
        description: 'Futuristic and scientific stories.',
      },
      {
        icon: <Ghost className={iconClass} />,
        title: 'Horror',
        description: 'Supernatural and psychological fear.',
      },
      {
        icon: <Shield className={iconClass} />,
        title: 'Action',
        description: 'High-octane action sequences.',
      },
      {
        icon: <Compass className={iconClass} />,
        title: 'Adventure',
        description: 'Epic journeys and quests.',
      },
      {
        icon: <History className={iconClass} />,
        title: 'Historical',
        description: 'Stories based on real events.',
      },
      {
        icon: <Film className={iconClass} />,
        title: 'Drama',
        description: 'Emotional and realistic narratives.',
      },
      {
        icon: <Music className={iconClass} />,
        title: 'Musical',
        description: 'Stories with music and dance.',
      },
      {
        icon: <Camera className={iconClass} />,
        title: 'Documentary',
        description: 'Real-life factual content.',
      },
      {
        icon: <Home className={iconClass} />,
        title: 'Slice of Life',
        description: 'Everyday relatable moments.',
      },
      {
        icon: <Sword className={iconClass} />,
        title: 'Action-Comedy',
        description: 'Action with humor.',
      },
      {
        icon: <WandSparkles className={iconClass} />,
        title: 'Superhero',
        description: 'Heroes saving the day.',
      },
      {
        icon: <Users className={iconClass} />,
        title: 'Family',
        description: 'Content for all ages.',
      },
      {
        icon: <User className={iconClass} />,
        title: 'Coming-of-Age',
        description: 'Growth and life transitions.',
      },
      {
        icon: <Eye className={iconClass} />,
        title: 'Noir',
        description: 'Dark, cynical crime stories.',
      },
      {
        icon: <Feather className={iconClass} />,
        title: 'Western',
        description: 'Frontier adventures.',
      },
      {
        icon: <BrainCircuit className={iconClass} />,
        title: 'Psychological Thriller',
        description: 'Suspense and mind games.',
      },
      {
        icon: <Eye className={iconClass} />,
        title: 'Satire',
        description: 'Humorous social critiques.',
      },
    ],
    []
  )

  return (
    <section className='w-full flex flex-col items-center justify-center gap-y-6 py-10'>
      <div className='max-w-6xl mx-auto text-center px-4'>
        <h2 className='max-sm:text-3xl text-4xl lg:text-5xl font-normal bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text'>
          Discover Popular Entertainment Genres
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300'>
          Explore diverse entertainment genres, from action thrillers to
          heartwarming romances.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4'>
        {genres.map((genre, index) => {
          const url = `/read/${genre.title.toLowerCase()}`
          return (
            <Link
              href={url}
              target='_blank'
              key={index}
              aria-label={`View ${genre.title} genre`}
            >
              <Card
                className='group cursor-pointer border border-zinc-400 dark:border-zinc-600 backdrop-blur-lg bg-gradient-to-br from-white/70 to-gray-100/70 dark:from-zinc-900/70 dark:to-zinc-800/70 rounded-3xl hover:scale-105 hover:-rotate-2 transition-transform duration-500 hover:shadow-2xl'
                onMouseEnter={() => setTooltipText(genre.title)}
                onMouseLeave={() => setTooltipText(null)}
              >
                <CardHeader className='flex items-center justify-center pb-2'>
                  {genre.icon}
                </CardHeader>
                <CardContent className='text-center'>
                  <CardTitle className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-100'>
                    {genre.title}
                  </CardTitle>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
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
