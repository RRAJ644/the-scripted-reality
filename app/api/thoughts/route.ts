import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const thoughts = await Thought.find().sort({ createdAt: -1 })
    return NextResponse.json(thoughts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch thoughts' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { title } = await req.json()
    const newThought = await Thought.create({ title, subThoughts: [] })
    return NextResponse.json(newThought, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create thought' },
      { status: 500 }
    )
  }
}
