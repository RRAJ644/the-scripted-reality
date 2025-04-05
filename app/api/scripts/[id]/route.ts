import { connectToDatabase } from '@/lib/db';
import Scripts from '@/models/Scripts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Script ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const script = await Scripts.findById(id);

    if (!script) {
      return NextResponse.json(
        { success: false, message: 'Script not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: script },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching script:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
