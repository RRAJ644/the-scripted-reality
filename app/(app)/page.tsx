import Featured from '@/app/components/custom/Featured'
import Genres from '@/app/components/custom/Genres'
import Hero from '@/app/components/custom/Hero'
import MediaPartners from '@/app/components/custom/MediaPartners'
import TrendingStories from '@/app/components/custom/TrendingStories'

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
