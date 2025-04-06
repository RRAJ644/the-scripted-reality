import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    await connectToDatabase()

    const { genre } = await params

    let filter = {}
    if (genre) {
      filter = { genre }
    }

    const scripts = await Scripts.find(filter).sort({ createdAt: -1 })

    return Response.json(
      {
        success: true,
        count: scripts.length,
        data: scripts,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching scripts:', error)
    return Response.json(
      {
        success: false,
        message: 'Error fetching scripts',
      },
      { status: 500 }
    )
  }
}
