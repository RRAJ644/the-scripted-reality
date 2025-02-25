import { connectToDatabase } from '@/lib/db'
import User from '@/models/User'

export async function POST(request: Request) {
  await connectToDatabase()
  try {
    const { name, email, password, role } = await request.json()

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: 'User is already present',
        },
        {
          status: 400,
        }
      )
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'writer',
    })
    return Response.json(
      {
        success: true,
        message: 'User registered successfully.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.log('Error registering the user', error)
    return Response.json(
      {
        success: false,
        message: 'Error registering the user',
      },
      {
        status: 500,
      }
    )
  }
}
