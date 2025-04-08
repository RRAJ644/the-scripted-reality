import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const blogs = await Blog.find({ status: 'published' }).sort({
      createdAt: -1,
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}
