'use client'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card } from '@/app/components/ui/card'
import { ChevronDown, ChevronUp, Trash, Edit, Save } from 'lucide-react'

const Thoughts: React.FC = () => {
  const [thought, setThought] = useState<string>('')
  const [thoughts, setThoughts] = useState<
    {
      title: string
      expanded: boolean
      subThoughts: { text: string; isEditing: boolean }[]
    }[]
  >([])

  const addThought = () => {
    if (thought.trim()) {
      setThoughts([
        ...thoughts,
        { title: thought, expanded: false, subThoughts: [] },
      ])
      setThought('')
    }
  }

  const toggleExpand = (index: number) => {
    setThoughts(
      thoughts.map((t, i) =>
        i === index ? { ...t, expanded: !t.expanded } : t
      )
    )
  }

  const addSubThought = (index: number, subThought: string) => {
    if (subThought.trim()) {
      setThoughts(
        thoughts.map((t, i) =>
          i === index
            ? {
                ...t,
                subThoughts: [
                  ...t.subThoughts,
                  { text: subThought, isEditing: false },
                ],
              }
            : t
        )
      )
    }
  }

  const deleteThought = (index: number) => {
    setThoughts(thoughts.filter((_, i) => i !== index))
  }

  const deleteSubThought = (tIndex: number, sIndex: number) => {
    setThoughts(
      thoughts.map((t, i) =>
        i === tIndex
          ? { ...t, subThoughts: t.subThoughts.filter((_, j) => j !== sIndex) }
          : t
      )
    )
  }

  const editSubThought = (tIndex: number, sIndex: number, text: string) => {
    setThoughts(
      thoughts.map((t, i) =>
        i === tIndex
          ? {
              ...t,
              subThoughts: t.subThoughts.map((s, j) =>
                j === sIndex ? { ...s, text, isEditing: false } : s
              ),
            }
          : t
      )
    )
  }

  const toggleEditSubThought = (tIndex: number, sIndex: number) => {
    setThoughts(
      thoughts.map((t, i) =>
        i === tIndex
          ? {
              ...t,
              subThoughts: t.subThoughts.map((s, j) =>
                j === sIndex ? { ...s, isEditing: !s.isEditing } : s
              ),
            }
          : t
      )
    )
  }

  return (
    <section className='w-full min-h-screen flex flex-col items-center px-6 py-8 bg-gray-100'>
      <Card className='w-full bg-white shadow-md border border-gray-300 p-5 flex flex-col gap-y-4 rounded-2xl'>
        <Input
          type='text'
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          className='rounded-[0.5rem] h-12 border-gray-300 focus:ring-2 focus:ring-blue-500'
          placeholder='Write something...'
        />
        <Button
          onClick={addThought}
          className='w-fit text-lg bg-neutral-800 text-white rounded-xl py-3 px-6 hover:bg-neutral-900'
        >
          Add Thought
        </Button>
      </Card>

      <div className='w-full mt-6 space-y-4'>
        {thoughts.map((t, index) => (
          <Card
            key={index}
            className='bg-white shadow-md border border-gray-300 p-5 rounded-2xl'
          >
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold'>{t.title}</h3>
              <div className='flex gap-2'>
                <Button onClick={() => toggleExpand(index)} className='p-2'>
                  {t.expanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </Button>
                <Button onClick={() => deleteThought(index)} className='p-2'>
                  <Trash size={20} className='text-red-500' />
                </Button>
              </div>
            </div>
            {t.expanded && (
              <div className='mt-4 space-y-3'>
                {t.subThoughts.map((sub, sIndex) => (
                  <div
                    key={sIndex}
                    className='flex justify-between text-2xl items-center bg-gray-200 px-6 py-4 rounded-xl'
                  >
                    {sub.isEditing ? (
                      <Input
                        type='text'
                        defaultValue={sub.text}
                        className='flex-1 border-gray-300 rounded-lg'
                        onBlur={(e) =>
                          editSubThought(index, sIndex, e.target.value)
                        }
                      />
                    ) : (
                      <span>{sub.text}</span>
                    )}
                    <div className='flex gap-2'>
                      <Button
                        onClick={() => toggleEditSubThought(index, sIndex)}
                        className='p-2'
                      >
                        {sub.isEditing ? (
                          <Save size={16} className='text-green-500' />
                        ) : (
                          <Edit size={16} />
                        )}
                      </Button>
                      <Button
                        onClick={() => deleteSubThought(index, sIndex)}
                        className='p-2'
                      >
                        <Trash size={16} className='text-red-500' />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className='flex gap-2'>
                  <Input
                    type='text'
                    className='rounded-[0.5rem] h-12 border-gray-300 focus:ring-2 focus:ring-blue-500'
                    placeholder='Add a sub-thought...'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSubThought(index, e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Thoughts
