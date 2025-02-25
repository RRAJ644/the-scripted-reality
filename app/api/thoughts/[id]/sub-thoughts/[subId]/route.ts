import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 3]
    const subId = pathSegments[pathSegments.length - 1]

    if (!id || !subId) {
      return NextResponse.json(
        { error: 'Invalid ID or Sub-ID' },
        { status: 400 }
      )
    }

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: id,
        'subThoughts._id': subId,
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

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase()

    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 3]
    const subId = pathSegments[pathSegments.length - 1]

    if (!id || !subId) {
      return NextResponse.json(
        { error: 'Invalid ID or Sub-ID' },
        { status: 400 }
      )
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      id,
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
