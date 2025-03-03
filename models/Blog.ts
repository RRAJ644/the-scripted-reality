import mongoose, { model, Schema, models } from 'mongoose'

export interface IBlog {
  _id?: mongoose.Types.ObjectId
  title: string
  description: Schema.Types.Mixed
  status: 'Draft' | 'Published'
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      required: true,
      default: 'Draft',
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = models.Blog || model<IBlog>('Blog', blogSchema)

export default Blog
