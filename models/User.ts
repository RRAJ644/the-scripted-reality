import mongoose, { model, Schema, models } from 'mongoose'
import bcrypt from 'bcryptjs'

type Role = 'superadmin' | 'admin' | 'writer'

export interface IUser {
  _id?: mongoose.Types.ObjectId
  name: string
  email: string
  role: Role
  password: string
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'writer'],
      default: 'writer',
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = models?.User || model<IUser>('User', userSchema)
export default User
