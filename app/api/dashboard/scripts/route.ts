import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    let filter: any = {}

    if (status) {
      filter.status = status
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

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return Response.json(
        { success: false, message: 'Script ID is required' },
        { status: 400 }
      )
    }

    const updatedScript = await Scripts.findByIdAndUpdate(_id, updateData, {
      new: true,
    })

    if (!updatedScript) {
      return Response.json(
        { success: false, message: 'Script not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Script updated successfully',
        data: updatedScript,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating script:', error)
    return Response.json(
      { success: false, message: 'Error updating script' },
      { status: 500 }
    )
  }
}
