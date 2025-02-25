import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    await connectToDatabase()

    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() // Extracts the ID from the URL

    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const thought = await Thought.findById(id)
    if (!thought)
      return NextResponse.json({ error: 'Thought not found' }, { status: 404 })

    return NextResponse.json(thought)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch thought' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase()

    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() // Extract ID

    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const { title } = await req.json()
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { title, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedThought)
      return NextResponse.json({ error: 'Thought not found' }, { status: 404 })

    return NextResponse.json(updatedThought)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update thought' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase()

    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() // Extract ID

    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const deletedThought = await Thought.findByIdAndDelete(id)
    if (!deletedThought)
      return NextResponse.json({ error: 'Thought not found' }, { status: 404 })

    return NextResponse.json({ message: 'Thought deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete thought' },
      { status: 500 }
    )
  }
}
