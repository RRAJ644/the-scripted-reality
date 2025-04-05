import Featured from '@/components/custom/Featured'
import Genres from '@/components/custom/Genres'
import Hero from '@/components/custom/Hero'
import MediaPartners from '@/components/custom/MediaPartners'
import TrendingStories from '@/components/custom/TrendingStories'

export default function Home() {

  
  return (
    <section className='flex flex-col items-center justify-center gap-y-10'>
      <Hero />
      <Featured />
      <Genres />
      <TrendingStories />
      <MediaPartners />
    </section>
  )
}
