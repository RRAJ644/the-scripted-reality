'use client'
import ScreenplayGrid from '@/components/custom/ScreenplayGrid'
import Search from '@/components/custom/Search'
import useSearch from '@/hooks/useSearch'
import { SCREEN_PLAYS } from '@/lib/constants'
import { useParams } from 'next/navigation'
import React from 'react'

const GENRE_DETAILS = new Map([
  [
    'Crime',
    {
      title: 'Best Crime Movies & TV Shows - Gritty & Suspenseful',
      description:
        'Explore the top crime movies and TV shows, featuring intense investigations, mob dramas, and thrilling heists that keep you on the edge of your seat.',
    },
  ],
  [
    'Psychological',
    {
      title: 'Mind-Bending Psychological Movies & Shows',
      description:
        'Dive into the world of psychological movies and TV shows that challenge your perception, featuring gripping storylines and deep character studies.',
    },
  ],
  [
    'Romance',
    {
      title: 'Top Romantic Movies & Series - Love & Passion',
      description:
        'Experience the most heartwarming romance movies and TV shows, from timeless love stories to modern-day romantic masterpieces.',
    },
  ],
  [
    'RomCom',
    {
      title: 'Best Romantic Comedies - Love & Laughter',
      description:
        'Discover the top romcoms that blend romance and comedy, delivering unforgettable love stories with a humorous twist.',
    },
  ],
  [
    'SitCom',
    {
      title: 'Top Sitcoms - The Funniest TV Shows of All Time',
      description:
        'Laugh out loud with the best sitcoms ever made, featuring iconic characters, witty humor, and feel-good moments.',
    },
  ],
  [
    'Thriller',
    {
      title: 'Best Thriller Movies & TV Shows - High-Stakes Suspense',
      description:
        'Watch the most intense thriller movies and TV shows packed with suspense, mystery, and unexpected twists.',
    },
  ],
  [
    'Mystery',
    {
      title: 'Top Mystery Films & Series - Intriguing & Suspenseful',
      description:
        'Unravel mind-boggling mysteries with top-rated mystery movies and TV shows filled with secrets, investigations, and shocking revelations.',
    },
  ],
  [
    'Fantasy',
    {
      title: 'Best Fantasy Movies & Shows - Magical & Epic',
      description:
        'Escape into magical worlds with the best fantasy films and TV series, featuring mythical creatures, legendary heroes, and epic adventures.',
    },
  ],
  [
    'Sci-Fi',
    {
      title: 'Top Sci-Fi Movies & TV Shows - Futuristic & Visionary',
      description:
        'Discover mind-blowing sci-fi movies and series exploring space, time travel, artificial intelligence, and futuristic technology.',
    },
  ],
  [
    'Horror',
    {
      title: 'Scariest Horror Movies & Shows - Chilling & Terrifying',
      description:
        'Brace yourself for spine-chilling horror movies and TV series packed with supernatural entities, haunted places, and psychological terror.',
    },
  ],
  [
    'Action',
    {
      title: 'Best Action Movies & Series - Explosive & Adrenaline-Packed',
      description:
        'Get your adrenaline fix with the best action movies and TV shows featuring high-speed chases, explosive fight scenes, and heroic battles.',
    },
  ],
  [
    'Adventure',
    {
      title: 'Top Adventure Films & Series - Thrilling Journeys',
      description:
        'Embark on epic adventures with movies and TV series filled with daring quests, breathtaking landscapes, and heroic legends.',
    },
  ],
  [
    'Historical',
    {
      title: 'Best Historical Movies & TV Shows - Timeless Stories',
      description:
        'Relive the past with historical movies and TV series that bring legendary figures and iconic events to life with stunning accuracy.',
    },
  ],
  [
    'Drama',
    {
      title: 'Top Drama Movies & Series - Emotionally Powerful',
      description:
        'Experience the most compelling drama movies and TV shows featuring intense storytelling, deep emotions, and outstanding performances.',
    },
  ],
  [
    'Musical',
    {
      title: 'Best Musical Films & Shows - Melodic & Entertaining',
      description:
        'Sing along to the greatest musical movies and TV series filled with unforgettable songs, dazzling performances, and inspiring stories.',
    },
  ],
  [
    'Documentary',
    {
      title: 'Top Documentaries - Informative & Eye-Opening',
      description:
        'Discover the best documentary films and series that explore real-life events, fascinating discoveries, and untold stories from around the world.',
    },
  ],
  [
    'Slice of Life',
    {
      title: 'Best Slice of Life Movies & Shows - Real & Heartwarming',
      description:
        'Enjoy the finest slice-of-life movies and TV series depicting relatable characters, everyday moments, and heartfelt storytelling.',
    },
  ],
  [
    'Action-Comedy',
    {
      title: 'Top Action-Comedy Movies & Shows - Laugh & Thrill',
      description:
        'Experience the best of both worlds with action-packed comedies that deliver thrilling sequences and hilarious moments.',
    },
  ],
  [
    'Superhero',
    {
      title: 'Best Superhero Movies & Series - Iconic & Heroic',
      description:
        'Witness the rise of superheroes in the best superhero movies and TV shows featuring legendary heroes, epic battles, and extraordinary powers.',
    },
  ],
  [
    'Family',
    {
      title: 'Top Family Movies & Shows - Fun for All Ages',
      description:
        'Gather the whole family for heartwarming and entertaining family-friendly movies and TV series that everyone can enjoy together.',
    },
  ],
  [
    'Coming-of-Age',
    {
      title: 'Best Coming-of-Age Movies & Shows - Growth & Discovery',
      description:
        'Watch the most inspiring coming-of-age films and series that capture the essence of growing up, self-discovery, and life-changing experiences.',
    },
  ],
  [
    'Noir',
    {
      title: 'Top Film Noir Movies - Dark & Atmospheric',
      description:
        'Step into the shadowy world of film noir with classic and modern noir films featuring gritty crime, femme fatales, and moody cinematography.',
    },
  ],
  [
    'Western',
    {
      title: 'Best Western Movies & TV Shows - Cowboys & Outlaws',
      description:
        'Ride into the Wild West with top western movies and series featuring iconic gunslingers, frontier justice, and epic showdowns.',
    },
  ],
  [
    'Psychological Thriller',
    {
      title:
        'Best Psychological Thriller Movies & Shows - Mind Games & Suspense',
      description:
        'Lose yourself in the best psychological thrillers filled with suspense, mind games, and unpredictable plot twists.',
    },
  ],
  [
    'Satire',
    {
      title: 'Top Satirical Movies & TV Shows - Smart & Witty',
      description:
        'Enjoy sharp and witty satire movies and series that cleverly critique society, politics, and pop culture through humor and irony.',
    },
  ],
])

const GenreInner = () => {
  const params = useParams()
  const genre = params?.genre
  const genreStr = Array.isArray(genre) ? genre[0] : genre!

  const { query, handleChange } = useSearch()

  const screenPlay = SCREEN_PLAYS.filter(
    (play) => genreStr?.toLowerCase() === play.genre.toLowerCase()
  )

  const filteredScreenPlays = screenPlay.filter((play) =>
    play.title.toLowerCase().includes(query.toLowerCase())
  )

  const title = GENRE_DETAILS?.get(screenPlay[0]?.genre)?.title
  const description = GENRE_DETAILS?.get(screenPlay[0]?.genre)?.description

  return (
    <section className='w-full flex justify-center items-center flex-col gap-y-8 py-6 px-44 mt-6'>
      <div className='max-w-4xl text-center space-y-6'>
        <h1 className='text-5xl md:text-6xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          {title}
        </h1>
        <p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
          {description}
        </p>
      </div>

      <Search query={query} handleChange={handleChange} />

      <ScreenplayGrid screenplays={filteredScreenPlays} />
    </section>
  )
}

export default GenreInner
