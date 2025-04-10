import { slugify } from '@/lib/constants'
import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    await connectToDatabase()
    const blogs = await Blog.find({ status }).sort({ createdAt: -1 })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { title, description, status, imageUrl } = body

    if (!title || !description || !status || !imageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const newBlog = await Blog.create({
      title,
      description,
      status,
      imageUrl,
      slug: slugify(title),
    })

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
