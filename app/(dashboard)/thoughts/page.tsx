'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card } from '@/app/components/ui/card'
import { ChevronDown, ChevronUp, Trash, Edit, Check } from 'lucide-react'

interface SubThought {
  _id: string
  text: string
}

interface Thought {
  _id: string
  title: string
  expanded?: boolean
  subThoughts: SubThought[]
}

const Thoughts: React.FC = () => {
  const [thought, setThought] = useState('')
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(false)
  const [editingSub, setEditingSub] = useState<{
    tId: string
    sId: string
    text: string
  } | null>(null)

  const [editingThought, setEditingThought] = useState<{
    tId: string
    title: string
  } | null>(null)

  const fetchThoughts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/thoughts')

      setThoughts((prevThoughts) =>
        data.map((newThought: Thought) => {
          const existingThought = prevThoughts.find(
            (t) => t._id === newThought._id
          )
          return {
            ...newThought,
            expanded: existingThought?.expanded ?? false,
          }
        })
      )
    } catch (error) {
      console.error('Error fetching thoughts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThoughts()
  }, [])

  const addThought = async () => {
    if (!thought.trim()) return
    try {
      await axios.post('/api/thoughts', { title: thought })
      setThought('')
      fetchThoughts()
    } catch (error) {
      console.error('Error adding thought:', error)
    }
  }

  const deleteThought = async (id: string) => {
    try {
      await axios.delete(`/api/thoughts/${id}`)
      fetchThoughts()
    } catch (error) {
      console.error('Error deleting thought:', error)
    }
  }

  const addSubThought = async (id: string, subText: string) => {
    if (!subText.trim()) return
    try {
      await axios.post(`/api/thoughts/${id}/sub-thoughts`, { text: subText })
      fetchThoughts()
    } catch (error) {
      console.error('Error adding sub-thought:', error)
    }
  }

  const deleteSubThought = async (tId: string, sId: string) => {
    try {
      await axios.delete(`/api/thoughts/${tId}/sub-thoughts/${sId}`)
      fetchThoughts()
    } catch (error) {
      console.error('Error deleting sub-thought:', error)
    }
  }

  const updateThought = async () => {
    if (!editingThought || !editingThought.title.trim()) return
    try {
      await axios.put(`/api/thoughts/${editingThought.tId}`, {
        title: editingThought.title,
      })
      setEditingThought(null)
      fetchThoughts()
    } catch (error) {
      console.error('Error updating thought:', error)
    }
  }

  const updateSubThought = async () => {
    if (!editingSub || !editingSub.text.trim()) return
    try {
      await axios.put(
        `/api/thoughts/${editingSub.tId}/sub-thoughts/${editingSub.sId}`,
        { text: editingSub.text }
      )
      setEditingSub(null)
      fetchThoughts()
    } catch (error) {
      console.error('Error updating sub-thought:', error)
    }
  }

  return (
    <section className='w-full min-h-screen flex flex-col items-center px-6 py-4 bg-gray-100'>
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
          className='w-fit text-lg bg-neutral-800 text-white rounded-xl p-6 hover:bg-neutral-900'
        >
          Add Thought
        </Button>
      </Card>

      {loading ? (
        <p className='mt-6 text-gray-600'>Loading thoughts...</p>
      ) : (
        <div className='w-full space-y-4 cursor-pointer py-6'>
          {thoughts.map((t) => (
            <Card
              key={t._id}
              className='bg-white shadow-md border border-gray-300 p-6 rounded-2xl'
            >
              <div
                className='flex justify-between items-center gap-x-3'
                onClick={() =>
                  setThoughts(
                    thoughts.map((th) =>
                      th._id === t._id ? { ...th, expanded: !th.expanded } : th
                    )
                  )
                }
              >
                {editingThought && editingThought.tId === t._id ? (
                  <Input
                    type='text'
                    value={editingThought.title}
                    onChange={(e) =>
                      setEditingThought({
                        ...editingThought,
                        title: e.target.value,
                      })
                    }
                    className='w-full rounded-[0.5rem] h-12 border-gray-300 focus:ring-2 focus:ring-blue-500'
                  />
                ) : (
                  <h3 className='text-lg font-semibold'>{t.title}</h3>
                )}

                <div className='flex'>
                  {editingThought && editingThought.tId === t._id ? (
                    <Button onClick={updateThought} className='p-2'>
                      <Check size={20} />
                    </Button>
                  ) : (
                    <div>
                      <Button
                        onClick={() =>
                          setEditingThought({ tId: t._id, title: t.title })
                        }
                        className='p-2'
                      >
                        <Edit size={20} />
                      </Button>
                      <Button
                        onClick={() => deleteThought(t._id)}
                        className='p-2'
                      >
                        <Trash size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {t.expanded && (
                <div className='mt-4 space-y-3'>
                  {t.subThoughts.map((sub) => (
                    <div
                      key={sub._id}
                      className='flex justify-between text-2xl items-center bg-gray-200 px-6 py-4 rounded-xl'
                    >
                      {editingSub && editingSub.sId === sub._id ? (
                        <Input
                          type='text'
                          value={editingSub.text}
                          onChange={(e) =>
                            setEditingSub({
                              ...editingSub,
                              text: e.target.value,
                            })
                          }
                          className='rounded-[0.5rem] h-10 border-gray-300 focus:ring-2 focus:ring-blue-500'
                        />
                      ) : (
                        <span>{sub.text}</span>
                      )}
                      <div className='flex gap-2'>
                        {editingSub && editingSub.sId === sub._id ? (
                          <Button onClick={updateSubThought} className='p-2'>
                            <Check size={16} className='text-green-500' />
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              setEditingSub({
                                tId: t._id,
                                sId: sub._id,
                                text: sub.text,
                              })
                            }
                            className='p-2'
                          >
                            <Edit size={16} className='text-blue-500' />
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteSubThought(t._id, sub._id)}
                          className='p-2'
                        >
                          <Trash size={16} className='text-red-500' />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Input
                    type='text'
                    className='rounded-[0.5rem] h-12 border-gray-300 focus:ring-2 focus:ring-blue-500'
                    placeholder='Add a sub-thought...'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSubThought(t._id, e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default Thoughts
