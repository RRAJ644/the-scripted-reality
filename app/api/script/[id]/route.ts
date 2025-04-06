import Scripts from '@/models/Scripts'
import { NextRequest } from 'next/server'
import { Types } from 'mongoose'
import { connectToDatabase } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    const { id } = await params

    if (!id || !Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid or missing script ID' },
        { status: 400 }
      )
    }

    const script = await Scripts.findById(id)

    if (!script) {
      return Response.json(
        { success: false, message: 'Script not found' },
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
    console.error('Error fetching script:', error)
    return Response.json(
      {
        success: false,
        message: 'Error fetching script',
      },
      { status: 500 }
    )
  }
}
