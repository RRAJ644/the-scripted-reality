import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  context: { params: { thoughtId: string; subId: string } }
) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: context.params.thoughtId,
        'subThoughts._id': context.params.subId,
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

export async function DELETE(
  req: Request,
  context: { params: { thoughtId: string; subId: string } }
) {
  try {
    await connectToDatabase()
    const updatedThought = await Thought.findByIdAndUpdate(
      context.params.thoughtId,
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
