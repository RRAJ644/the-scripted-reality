import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const { title, description, status, imageUrl } = await request.json()

    if (!title || !description || !imageUrl || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newBlog = await Blog.create({ title, description, status, imageUrl })

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectToDatabase()
    const blogs = await Blog.find({ status: 'Draft' }).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, blogs }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}
