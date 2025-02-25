import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 2]

    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      {
        $push: {
          subThoughts: {
            _id: new mongoose.Types.ObjectId(),
            text,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    )

    if (!updatedThought)
      return NextResponse.json({ error: 'Thought not found' }, { status: 404 })

    return NextResponse.json(updatedThought)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add sub-thought' },
      { status: 500 }
    )
  }
}
