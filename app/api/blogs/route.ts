import { slugify } from '@/lib/constants'
import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const blogs = await Blog.find({ status }).sort({
      createdAt: -1,
    })

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

export async function PUT(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return Response.json(
        { success: false, message: 'Blog ID is required' },
        { status: 400 }
      )
    }

    const updatedBlog = await Blog.findByIdAndUpdate(_id, updateData, {
      new: true,
    })

    if (!updatedBlog) {
      return Response.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating blog:', error)
    return Response.json(
      { success: false, message: 'Error updating blog' },
      { status: 500 }
    )
  }
}
