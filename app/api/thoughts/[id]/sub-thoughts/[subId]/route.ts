import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextRequest, NextResponse } from 'next/server'

// The PUT route handler
export async function PUT(
  req: NextRequest,
  context: { params: { id: string; subId: string } } // Typing context correctly
) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: context.params.id, // Use `id` from `context.params`
        'subThoughts._id': context.params.subId, // Use `subId` from `context.params`
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
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string; subId: string } } // Typing context correctly
) {
  try {
    await connectToDatabase()
    const updatedThought = await Thought.findByIdAndUpdate(
      context.params.id, // Use `id` from `context.params`
      { $pull: { subThoughts: { _id: context.params.subId } } },
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
