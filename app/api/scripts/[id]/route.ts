import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'
import { NextRequest } from 'next/server'

// Define the expected params type
interface Params {
  id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectToDatabase()

    const { id } = params

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
