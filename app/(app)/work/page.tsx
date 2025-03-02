import {
  Mail,
  PenTool,
  Clapperboard,
  FileText,
  Mic,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    name: 'Screenwriting Services',
    icon: Clapperboard,
    description:
      'Expert screenplay writing for films, television series, and digital content. We craft compelling narratives, engaging characters, and industry-standard scripts that captivate audiences and maximize your project’s success.',
  },
  {
    name: 'Script Consulting & Analysis',
    icon: FileText,
    description:
      'In-depth script analysis and professional feedback to enhance storytelling, character development, and screenplay structure. Get expert insights to refine your screenplay and increase its marketability.',
  },
  {
    name: 'Authentic Dialogue Writing',
    icon: MessageCircle,
    description:
      'Crafting realistic and emotionally engaging dialogues that bring characters to life. Elevate your script with conversations that feel natural, impactful, and drive the story forward.',
  },
  {
    name: 'Adaptation Writing for Film & TV',
    icon: PenTool,
    description:
      'Transform books, real-life events, or articles into screen-ready scripts. We specialize in adapting complex narratives into compelling screenplays tailored for the silver screen, television, and streaming platforms.',
  },
  {
    name: 'Narration & Voiceover Scriptwriting',
    icon: Mic,
    description:
      'Professional narration and voiceover scripts designed for documentaries, corporate videos, and podcasts. Engage your audience with clear, powerful storytelling and seamless script flow.',
  },
]

const WorkWithUs = () => {
  return (
    <section className='py-10 px-6'>
      <div className='max-w-5xl mx-auto text-center'>
        <h1 className='max-sm:px-3 text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-neutral-700 via-zinc-600 to-gray-700 text-transparent bg-clip-text drop-shadow-md'>
          We are here to work with you
        </h1>
        <p className='mt-5 text-xl max-sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-sm:px-5'>
          Elevate your project with expertly crafted screenplays, insightful
          script consulting, and tailored writing solutions. We partner with
          filmmakers, studios, and content creators to bring stories to life
          with precision and creativity.
        </p>

        <div className='mt-6'>
          <Link href='mailto:the.scripted.reality27@gmail.com'>
            <Button className='px-6 py-5 text-lg rounded-2xl text-gray-50 bg-neutral-800 border-2 hover:bg-neutral-800 hover:text-gray-50'>
              <Mail className='mr-2' size={20} />
              Let’s Work Together
            </Button>
          </Link>
        </div>
      </div>

      <div className='mt-16 max-w-4xl mx-auto space-y-6'>
        {services.map(({ name, icon: Icon, description }, index) => (
          <div
            key={index}
            className='flex items-start space-x-4 border-l-4 border-neutral-700 bg-white p-5 rounded-md shadow-xl border'
          >
            <div className='bg-gray-100 p-3 rounded-full'>
              <Icon size={32} className='text-neutral-800' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>{name}</h2>
              <p className='mt-1 text-gray-700'>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkWithUs
