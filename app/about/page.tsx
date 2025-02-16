import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FaPenNib, FaBookOpen, FaUsers } from 'react-icons/fa'

const config = {
  heading: 'Explore the Art of Screenwriting with Us',
  description:
    'Welcome to our premier screenwriting platform, where creativity meets industry expertise. Discover compelling screenplays, insightful articles, and invaluable resources designed to inspire and educate aspiring and professional screenwriters alike. Join us as we share our work, insights, and passion for storytelling.',
  buttons: [
    {
      label: 'Schedule Call',
      variant: 'outline',
    },
  ],
  features: [
    {
      icon: <FaPenNib className='text-4xl text-neutral-700 mb-4' />,
      title: 'Professional Screenplays',
      description:
        'Browse a curated collection of screenplays showcasing diverse genres and writing styles.',
    },
    {
      icon: <FaBookOpen className='text-4xl text-zinc-600 mb-4' />,
      title: 'Expert Writing Tips',
      description:
        'Access expert advice and proven techniques to elevate your screenwriting skills.',
    },
    {
      icon: <FaUsers className='text-4xl text-gray-700 mb-4' />,
      title: 'Collaborative Community',
      description:
        'Engage with a dynamic community of writers, share ideas, and grow together.',
    },
  ],
}

const About = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center gap-y-20 max-lg:mt-20'>
      <div className='max-w-6xl'>
        <h1 className='text-5xl max-sm:text-3xl md:text-6xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-lg'>
          {config.heading}
        </h1>
        <p className='mt-5 text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
          {config.description}
        </p>

        <div className='mt-6 space-x-4'>
          {config.buttons.map((btn, idx) => (
            <Button
              key={idx}
              variant='outline'
              className='px-6 py-5 text-lg shadow-sm transition-all rounded-3xl'
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
        {config.features.map((feature, idx) => (
          <Card
            key={idx}
            className='flex flex-col items-center p-6 rounded-xl shadow-md text-center'
          >
            <CardHeader className='mb-4'>{feature.icon}</CardHeader>
            <div>
              <CardTitle className='text-xl font-semibold mb-2'>
                {feature.title}
              </CardTitle>
              <CardContent className='text-gray-600 dark:text-gray-300'>
                {feature.description}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default About
