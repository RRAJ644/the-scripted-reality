import mongoose, { model, Schema, models } from 'mongoose'

export interface IBlog {
  _id?: mongoose.Types.ObjectId
  title: string
  description: Schema.Types.Mixed
  status: 'draft' | 'published'
  imageUrl: string
  slug: string
}

enum STATUS {
  Draft = 'draft',
  Publish = 'published',
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
      enum: Object.values(STATUS),
      required: true,
      default: Object.values(STATUS)[0],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = models.Blog || model<IBlog>('Blog', blogSchema)

export default Blog
