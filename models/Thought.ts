import mongoose, { model, Schema, models } from 'mongoose'

interface ISubThought {
  _id: mongoose.Types.ObjectId
  text: string
  createdAt: Date
  updatedAt?: Date
}

export interface IThought {
  _id?: mongoose.Types.ObjectId
  title: string
  subThoughts: ISubThought[]
  createdAt: Date
  updatedAt?: Date
}

const ThoughtSchema = new Schema<IThought>(
  {
    title: { type: String, required: true },
    subThoughts: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
)

const Thought = models?.Thought || model<IThought>('Thought', ThoughtSchema)
export default Thought
