import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()

    const { id } = await context.params

    if (!id) {
      return Response.json(
        {
          success: false,
          message: 'Script ID is required',
        },
        { status: 400 }
      )
    }

    const script = await Scripts.findById(id)

    if (!script) {
      return Response.json(
        {
          success: false,
          message: 'Script not found',
        },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        data: script,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching script by ID:', error)
    return Response.json(
      {
        success: false,
        message: 'Error fetching script',
      },
      { status: 500 }
    )
  }
}
