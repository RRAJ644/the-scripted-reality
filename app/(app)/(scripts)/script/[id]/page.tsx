'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const InnerScript = () => {
  const [script, setScript] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

  const fetchScript = async () => {
    try {
      const res = await axios.get(`/api/script/${id}`)
      setScript(res.data.data)
    } catch (err: any) {
      console.error('Error fetching script:', err)
      setError('Failed to load script')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchScript()
  }, [id])

  if (loading) return <div className='text-center mt-10'>Loading script...</div>

  if (!script) return <div className='text-center mt-10'>No script found</div>

  return (
    <section className='max-w-7xl text-black font-mono mx-auto mt-10'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold uppercase'>{script.title}</h1>
        <p className='text-sm text-gray-600'>
          Written by {script.writer || 'Unknown'}
        </p>
        <p className='text-sm text-gray-600'>
          {script.date || 'Unknown date'} • {script.genre}
        </p>
      </div>

      {script.script.map((scene: any, index: number) => (
        <div key={index} className='mb-8'>
          <h2 className='text-lg font-bold uppercase text-gray-900'>
            {scene.heading}
          </h2>

          <p className='text-sm text-gray-700 italic my-2'>{scene.action}</p>

          {scene.dialogues.map((dialogue: any, idx: number) => (
            <div key={idx} className='my-4 text-center'>
              <h3 className='text-md font-bold uppercase text-gray-900'>
                {dialogue.character}
              </h3>
              {dialogue.parenthetical && (
                <p className='text-xs italic text-gray-500'>
                  {dialogue.parenthetical}
                </p>
              )}
              <p className='text-lg text-gray-800'>" {dialogue.line} "</p>
            </div>
          ))}

          {scene.transition && (
            <p className='text-sm font-bold text-right text-gray-900'>
              {scene.transition}
            </p>
          )}
        </div>
      ))}
    </section>
  )
}

export default InnerScript
