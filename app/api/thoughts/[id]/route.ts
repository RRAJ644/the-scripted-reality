import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const thought = await Thought.findById(params.id)
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { title } = await req.json()
    const updatedThought = await Thought.findByIdAndUpdate(
      params.id,
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log('Received ID:', params.id) // Debugging log
  try {
    await connectToDatabase()

    const deletedThought = await Thought.findByIdAndDelete(params.id)
    if (!deletedThought)
      return NextResponse.json({ error: 'Thought not found' }, { status: 404 })

    return NextResponse.json({ message: 'Thought deleted successfully' })
  } catch (error) {
    console.log(error, '====ee')
    return NextResponse.json(
      { error: 'Failed to delete thought' },
      { status: 500 }
    )
  }
}
