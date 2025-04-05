import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'
import { NextRequest, NextResponse } from 'next/server'

// Define the params type
type RouteParams = {
  params: {
    id: string
  }
}

export const GET = async (request: NextRequest, context: RouteParams) => {
  try {
    await connectToDatabase()

    const { id } = context.params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Script ID is required',
        },
        { status: 400 }
      )
    }

    const script = await Scripts.findById(id)

    if (!script) {
      return NextResponse.json(
        {
          success: false,
          message: 'Script not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: script,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching script by ID:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching script',
      },
      { status: 500 }
    )
  }
}
