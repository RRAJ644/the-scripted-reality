import { connectToDatabase } from '@/lib/db'
import Thought from '@/models/Thought'
import { NextResponse, NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { thoughtId: string; subId: string } }
) {
  try {
    await connectToDatabase()
    const { text } = await req.json()

    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: params.thoughtId,
        'subThoughts._id': params.subId,
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
  req: NextRequest,
  { params }: { params: { thoughtId: string; subId: string } }
) {
  try {
    await connectToDatabase()
    const updatedThought = await Thought.findByIdAndUpdate(
      params.thoughtId,
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
