'use client'

import { useState } from 'react'

const sampleScript = {
  title: 'THE LAST HUNT',
  writer: 'John Doe',
  date: 'March 2024',
  genre: 'Thriller',
  scenes: [
    {
      heading: 'INT. ABANDONED WAREHOUSE - NIGHT',
      action:
        'A single light bulb flickers, casting eerie shadows. Footsteps echo in the vast emptiness.',
      dialogues: [
        {
          character: 'JAMES',
          parenthetical: '(whispers)',
          line: 'Is anyone there?',
        },
        {
          character: 'UNKNOWN VOICE',
          line: 'You shouldn’t have come.',
        },
      ],
      transition: 'CUT TO:',
    },
    {
      heading: 'EXT. CITY STREET - NIGHT',
      action:
        'James runs down the rain-soaked alley, breath heavy. A shadow follows closely behind.',
      dialogues: [
        {
          character: 'JAMES',
          line: 'I have to find her before it’s too late!',
        },
      ],
      transition: 'FADE OUT.',
    },
  ],
}

const InnerScript = () => {
  const [script] = useState(sampleScript)

  return (
    <section className='max-w-7xl text-black font-mono mx-auto mt-10'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold uppercase'>{script.title}</h1>
        <p className='text-sm text-gray-600'>Written by {script.writer}</p>
        <p className='text-sm text-gray-600'>
          {script.date} • {script.genre}
        </p>
      </div>

      {script.scenes.map((scene, index) => (
        <div key={index} className='mb-8'>
          <h2 className='text-lg font-bold uppercase text-gray-900'>
            {scene.heading}
          </h2>

          <p className='text-sm text-gray-700 italic my-2'>{scene.action}</p>

          {scene.dialogues.map((dialogue, idx) => (
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
