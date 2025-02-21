import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

// 📌 GET single blog by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params

    const blog = await Blog.findById(id)
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, blog }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

// 📌 UPDATE blog by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params
    const { title, description, status, imageUrl } = await request.json()

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, status, imageUrl },
      { new: true, runValidators: true }
    )

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(
      { success: true, blog: updatedBlog },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// 📌 DELETE blog by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params

    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(
      { success: true, message: 'Blog deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
