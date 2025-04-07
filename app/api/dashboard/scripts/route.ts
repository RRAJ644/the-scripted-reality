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

    console.log(status, '======status')

    const scripts = await Scripts.find(filter).sort({ createdAt: -1 })

    console.log(scripts, '=====1111')
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
