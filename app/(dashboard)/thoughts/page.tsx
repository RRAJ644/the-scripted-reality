'use client'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { ChevronDown, Plus, Trash } from 'lucide-react'

interface Thought {
  title: string
  expanded: boolean
  points: string[]
}

const Thoughts: React.FC = () => {
  const [thought, setThought] = useState<string>('')
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [editingPoint, setEditingPoint] = useState<{
    thoughtIndex: number
    pointIndex: number
  } | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  const addThoughts = (): void => {
    if (thought.trim() === '') return
    setThoughts([...thoughts, { title: thought, expanded: false, points: [] }])
    setThought('')
  }

  const toggleExpand = (index: number): void => {
    setThoughts(
      thoughts.map((t, i) =>
        i === index ? { ...t, expanded: !t.expanded } : t
      )
    )
  }

  const addPoint = (index: number, point: string): void => {
    if (point.trim() === '') return
    setThoughts(
      thoughts.map((t, i) =>
        i === index ? { ...t, points: [...t.points, point] } : t
      )
    )
  }

  const deletePoint = (thoughtIndex: number, pointIndex: number): void => {
    setThoughts(
      thoughts.map((t, i) =>
        i === thoughtIndex
          ? { ...t, points: t.points.filter((_, pi) => pi !== pointIndex) }
          : t
      )
    )
  }

  const startEditing = (
    thoughtIndex: number,
    pointIndex: number,
    value: string
  ): void => {
    setEditingPoint({ thoughtIndex, pointIndex })
    setEditValue(value)
  }

  const saveEdit = (): void => {
    if (editingPoint) {
      setThoughts(
        thoughts.map((t, i) =>
          i === editingPoint.thoughtIndex
            ? {
                ...t,
                points: t.points.map((p, pi) =>
                  pi === editingPoint.pointIndex ? editValue : p
                ),
              }
            : t
        )
      )
      setEditingPoint(null)
    }
  }

  return (
    <section className='w-full min-h-screen flex flex-col items-center px-6 py-8 bg-gray-100'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
        Manage Thoughts
      </h2>

      <div className='w-full bg-white shadow-md border border-gray-300 p-5 rounded-lg'>
        <Input
          type='text'
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          className='rounded-md py-3 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500'
          placeholder='Write something...'
        />
        <Button
          className='mt-3 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition'
          onClick={addThoughts}
        >
          Add Thought
        </Button>
      </div>

      <div className='w-full mt-6'>
        {thoughts.map((t, index) => (
          <div
            key={index}
            className='mb-4 border border-gray-500 rounded-xl overflow-hidden p-4'
          >
            <div
              className='flex justify-between items-center bg-white shadow-lg rounded-xl border border-gray-300 p-4 cursor-pointer'
              onClick={() => toggleExpand(index)}
            >
              <p className='font-normal text-gray-800 text-xl'>{t.title}</p>
              <ChevronDown
                className={`transition-transform ${
                  t.expanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {t.expanded && (
              <div className='mt-2 bg-gray-50 border border-gray-300 rounded-lg p-4'>
                {t.points.map((point, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between border-b py-2'
                  >
                    {editingPoint?.thoughtIndex === index &&
                    editingPoint.pointIndex === i ? (
                      <Input
                        type='text'
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                        className='w-full text-gray-700 px-2 py-1 border rounded-md'
                      />
                    ) : (
                      <p
                        className='text-gray-700 cursor-pointer'
                        onClick={() => startEditing(index, i, point)}
                      >
                        • {point}
                      </p>
                    )}
                    <Button
                      variant='ghost'
                      className='hover:text-red-600'
                      onClick={() => deletePoint(index, i)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
                <div className='flex items-center gap-x-2 mt-3'>
                  <Input
                    type='text'
                    placeholder='Add a point...'
                    className='flex-1 border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addPoint(index, e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <Button
                    variant='outline'
                    className='border-gray-400 hover:bg-gray-200'
                    onClick={(e) => {
                      const input = e.currentTarget
                        .previousSibling as HTMLInputElement
                      if (input) {
                        addPoint(index, input.value)
                        input.value = ''
                      }
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Thoughts
