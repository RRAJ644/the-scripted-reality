import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextRequest, NextResponse } from 'next/server'

// The PUT route handler
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    // Extracting `id` and `subId` from the request URL
    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 3] // Get `id` from the path
    const subId = pathSegments[pathSegments.length - 1] // Get `subId` from the path

    if (!id || !subId) {
      return NextResponse.json(
        { error: 'Invalid ID or Sub-ID' },
        { status: 400 }
      )
    }

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: id, // Use `id`
        'subThoughts._id': subId, // Use `subId`
      },
      {
        $set: {
          'subThoughts.$.text': text,
          'subThoughts.$.updatedAt': new Date(),
        },
      },
      { new: true }
    )

    if (!updatedThought)
      return NextResponse.json(
        { error: 'Sub-thought not found' },
        { status: 404 }
      )

    return NextResponse.json(updatedThought)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update sub-thought' },
      { status: 500 }
    )
  }
}

// The DELETE route handler
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase()

    // Extracting `id` and `subId` from the request URL
    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 3] // Get `id` from the path
    const subId = pathSegments[pathSegments.length - 1] // Get `subId` from the path

    if (!id || !subId) {
      return NextResponse.json(
        { error: 'Invalid ID or Sub-ID' },
        { status: 400 }
      )
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      id, // Use `id`
      { $pull: { subThoughts: { _id: subId } } },
      { new: true }
    )

    if (!updatedThought)
      return NextResponse.json(
        { error: 'Sub-thought not found' },
        { status: 404 }
      )

    return NextResponse.json(updatedThought)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete sub-thought' },
      { status: 500 }
    )
  }
}
