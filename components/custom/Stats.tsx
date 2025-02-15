import React from 'react'

const Stats = () => {
  const stats = [
    { label: 'Screenplays', value: '500+' },
    { label: 'Blog Posts', value: '300+' },
    { label: 'Community Members', value: '1K+' },
    { label: 'Years of Experience', value: '5+' },
  ]

  return (
    <section className='bg-white dark:bg-zinc-900 text-center border-zinc-700'>
      <div className='max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div key={index} className='flex flex-col items-center'>
            <h2 className='text-4xl font-extrabold bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text'>
              {stat.value}
            </h2>
            <p className='mt-2 text-lg text-gray-700 dark:text-gray-300'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
