import mongoose from 'mongoose'

const MONGODB_URI = process.env.NEXT_MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Database Error')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw new Error('Check Database connection')
  }

  return cached.conn
}
