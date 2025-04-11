import { connectToDatabase } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextRequest } from 'next/server'

// Define the type for params explicitly

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
