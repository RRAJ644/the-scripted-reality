import { connectToDatabase } from '@/lib/db'
import Scripts from '@/models/Scripts'
import { NextRequest } from 'next/server'

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()

    const { title, description, imageUrl, hoverGif, genre, script } = body

    if (!title || !description || !imageUrl || !hoverGif || !genre || !script) {
      return Response.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    const newScript = await Scripts.create({
      title,
      description,
      imageUrl,
      hoverGif,
      genre,
      script,
    })

    return Response.json(
      {
        success: true,
        message: 'Script created successfully',
        data: newScript,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating the script:', error)
    return Response.json(
      {
        success: false,
        message: 'Error creating the script',
      },
      {
        status: 500,
      }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params?: { genre?: string } } = {}
) {
  try {
    await connectToDatabase()

    const url = new URL(request.url)
    const searchParams = url.searchParams

    const pathGenre = params?.genre
    const queryGenres = searchParams.get('genres')

    let filter = {}

    if (pathGenre) {
      filter = { genre: pathGenre }
    } else if (queryGenres) {
      const genresArray = queryGenres.split('+').map(decodeURIComponent)
      filter = { genre: { $in: genresArray } }
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
