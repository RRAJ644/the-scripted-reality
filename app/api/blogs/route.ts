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

export async function GET(req: Request) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const blogs = await Blog.find({ status })

    return NextResponse.json({ blogs })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const blogId = searchParams.get('id')

    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      )
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
