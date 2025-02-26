import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    const userId = token?._id
    const role = token?.role
    console.log(role, '====ddd')
    let thoughts

    await connectToDatabase()
    if (token?.role === 'superadmin') {
      thoughts = await Thought.find().sort({
        createdAt: -1,
      })
    } else {
      thoughts = await Thought.find({ userId }).sort({
        createdAt: -1,
      })
    }
    return NextResponse.json(thoughts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch thoughts' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const token = await getToken({ req })
    const userId = token?._id
    const { title } = await req.json()
    const newThought = await Thought.create({ title, subThoughts: [], userId })
    return NextResponse.json(newThought, { status: 201 })
  } catch (error) {
    console.log(error, '=====eee')
    return NextResponse.json(
      { error: 'Failed to create thought' },
      { status: 500 }
    )
  }
}
