import Featured from '@/components/custom/Featured'
// import FeaturedAuthors from '@/components/custom/FeaturedAuthors'
import Genres from '@/components/custom/Genres'
import Hero from '@/components/custom/Hero'
import MediaPartners from '@/components/custom/MediaPartners'
import TrendingStories from '@/components/custom/TrendingStories'

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Genres />
      <TrendingStories />
      {/* <FeaturedAuthors /> */}
      <MediaPartners />
    </>
  )
}
