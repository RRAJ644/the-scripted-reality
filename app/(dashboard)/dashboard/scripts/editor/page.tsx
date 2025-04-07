'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

const GENRES = [
  'Crime',
  'Psychological',
  'Romance',
  'RomCom',
  'SitCom',
  'Thriller',
  'Mystery',
  'Fantasy',
  'Sci-Fi',
  'Horror',
  'Action',
  'Adventure',
  'Historical',
  'Drama',
  'Musical',
  'Documentary',
  'Slice of Life',
  'Action-Comedy',
  'Superhero',
  'Family',
  'Coming-of-Age',
  'Noir',
  'Western',
  'Satire',
]

const TRANSITIONS = [
  'CUT TO:',
  'FADE IN:',
  'FADE OUT:',
  'DISSOLVE TO:',
  'SMASH CUT TO:',
  'MATCH CUT TO:',
  'JUMP CUT TO:',
  'WIPE TO:',
  'IRIS IN:',
  'IRIS OUT:',
  'WHIP PAN TO:',
  'CROSSFADE TO:',
  'MONTAGE SEQUENCE:',
  'INTERCUT WITH:',
  'FREEZE FRAME:',
  'SUPERIMPOSE:',
]

const ScriptsDashboard = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    hoverGif: '',
    genre: '',
    status: 'Draft',
  })

  const [scriptBlocks, setScriptBlocks] = useState([
    {
      heading: '',
      action: '',
      transition: '',
      dialogues: [{ character: '', parenthetical: '', line: '' }],
    },
  ])

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const saveDraft = async () => {
    try {
      const payload = {
        ...form,
        script: scriptBlocks,
        status: 'Draft',
      }
      await axios.post('/api/scripts/save-draft', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Failed to save draft', error)
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.status === 'Draft') {
        const message =
          'You have unsaved changes. Save as draft before leaving?'
        const shouldSave = window.confirm(message)

        if (shouldSave) {
          saveDraft()
        }

        e.preventDefault()
        Object.defineProperty(e, 'returnValue', {
          configurable: true,
          value: '',
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [form, scriptBlocks])

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        script: scriptBlocks,
        status: 'Draft',
      }

      setLoading(true)
      setSuccess(false)

      const res = await axios.post('/api/scripts', payload, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.data.success) {
        setSuccess(true)
        setForm({ ...form, status: 'Published' })
      }
    } catch (error) {
      console.error('Error submitting script', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-6 mt-12 p-6 border-2 overflow-hidden'>
      {/* Form fields */}
      <div className='space-y-4'>
        <Input
          placeholder='Title'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          placeholder='Description'
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          placeholder='Image URL'
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <Input
          placeholder='Hover GIF'
          value={form.hoverGif}
          onChange={(e) => setForm({ ...form, hoverGif: e.target.value })}
        />
        <select
          className='w-full border rounded px-3 py-2'
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        >
          <option value='' disabled>
            Select Genre
          </option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Script blocks */}
      {scriptBlocks.map((block, idx) => (
        <div key={idx} className='border p-4 rounded-lg space-y-4 bg-muted'>
          <Input
            placeholder='Scene Heading'
            value={block.heading}
            onChange={(e) => {
              const updated = [...scriptBlocks]
              updated[idx].heading = e.target.value
              setScriptBlocks(updated)
            }}
          />
          <Textarea
            placeholder='Action'
            value={block.action}
            onChange={(e) => {
              const updated = [...scriptBlocks]
              updated[idx].action = e.target.value
              setScriptBlocks(updated)
            }}
          />
          <select
            className='w-full border rounded px-3 py-2'
            value={block.transition}
            onChange={(e) => {
              const updated = [...scriptBlocks]
              updated[idx].transition = e.target.value
              setScriptBlocks(updated)
            }}
          >
            <option value='' disabled>
              Select Transition
            </option>
            {TRANSITIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <h3 className='font-medium text-lg'>Dialogues</h3>
          {block.dialogues.map((d, dIdx) => (
            <div
              key={dIdx}
              className='space-y-2 border rounded p-2 bg-background'
            >
              <Input
                placeholder='Character'
                value={d.character}
                onChange={(e) => {
                  const updated = [...scriptBlocks]
                  updated[idx].dialogues[dIdx].character = e.target.value
                  setScriptBlocks(updated)
                }}
              />
              <Input
                placeholder='Parenthetical (optional)'
                value={d.parenthetical}
                onChange={(e) => {
                  const updated = [...scriptBlocks]
                  updated[idx].dialogues[dIdx].parenthetical = e.target.value
                  setScriptBlocks(updated)
                }}
              />
              <Textarea
                placeholder='Dialogue line'
                value={d.line}
                onChange={(e) => {
                  const updated = [...scriptBlocks]
                  updated[idx].dialogues[dIdx].line = e.target.value
                  setScriptBlocks(updated)
                }}
              />
            </div>
          ))}
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              const updated = [...scriptBlocks]
              updated[idx].dialogues.push({
                character: '',
                parenthetical: '',
                line: '',
              })
              setScriptBlocks(updated)
            }}
          >
            ➕ Add Dialogue
          </Button>
        </div>
      ))}

      <div className='flex flex-col md:flex-row justify-between gap-4 items-center mt-6'>
        <Button
          variant='secondary'
          onClick={() => {
            setScriptBlocks([
              ...scriptBlocks,
              {
                heading: '',
                action: '',
                transition: '',
                dialogues: [{ character: '', parenthetical: '', line: '' }],
              },
            ])
          }}
        >
          ➕ Add Scene Block
        </Button>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : '🚀 Submit Script'}
        </Button>
      </div>

      {success && (
        <p className='text-green-600 font-semibold pt-4 text-center'>
          ✅ Script submitted successfully!
        </p>
      )}
    </div>
  )
}

export default ScriptsDashboard
