import mongoose from 'mongoose'
import { compareValue, hashValue } from '../utils/bcrypt'

interface UserDocument extends mongoose.Document {
  username: string
  email: string
  password: string
  verified: boolean
  createAt: Date
  updateAt: Date
  comparePassword(val: string): Promise<boolean>
  omitPassword(): Pick<UserDocument, '_id' | 'username' | 'email' | 'verified' | 'createAt' | 'updateAt'>
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    methods: {
      comparePassword: async function (val: string) {
        return await compareValue(val, this.password)
      },
      omitPassword: function () {
        const { password: _password, ...userWithoutPassword } = this.toObject()
        return userWithoutPassword
      }
    }
  }
)

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    return next()
  }

  this.password = await hashValue(this.password)
  next()
})

const userModel = mongoose.model<UserDocument>('User', userSchema)

export default userModel
