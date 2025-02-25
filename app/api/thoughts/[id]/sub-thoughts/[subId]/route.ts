import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { Params } from 'next/dist/server/request/params'
import { NextRequest, NextResponse } from 'next/server'

// The PUT route handler
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: params.id, // Use `id` from `params`
        'subThoughts._id': params.subId, // Use `subId` from `params`
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
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectToDatabase()
    const updatedThought = await Thought.findByIdAndUpdate(
      params.id, // Use `id` from `params`
      { $pull: { subThoughts: { _id: params.subId } } },
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
