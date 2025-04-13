import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase()

    const { slug } = await params

    if (!slug) {
      return Response.json(
        { success: false, message: 'Missing blog slug' },
        { status: 400 }
      )
    }

    const blog = await Blog.findOne({ slug })

    if (!blog) {
      return Response.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        data: blog,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching blog:', error)
    return Response.json(
      {
        success: false,
        message: 'Error fetching blog',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase()

    const { slug } = await params

    if (!slug) {
      return Response.json(
        { success: false, message: 'Missing blog slug' },
        { status: 400 }
      )
    }

    const blog = await Blog.deleteOne({ slug })

    if (!blog) {
      return Response.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error Deleting blog:', error)
    return Response.json(
      {
        success: false,
        message: 'Error Deleting blog',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase()

    const { slug } = await params

    if (!slug) {
      return Response.json(
        { success: false, message: 'Missing blog slug' },
        { status: 400 }
      )
    }

    let blog: any = await Blog.updateOne(
      { slug },
      { $set: { status: 'published' } }
    )

    blog = await Blog.findOne({ slug })

    if (!blog) {
      return Response.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error Publishing Blog:', error)
    return Response.json(
      {
        success: false,
        message: 'Error Publishing Blog',
      },
      { status: 500 }
    )
  }
}
