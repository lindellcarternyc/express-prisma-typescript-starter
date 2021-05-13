import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = process.env.TOKEN_SECRET

if (!TOKEN_SECRET) {
  console.error('No TOKEN SECRET FOUND')
  process.exit(1)
}

export const encodePassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

export const comparePasswords = async (plaintext: string, hashed: string) => {
  return await bcrypt.compare(plaintext, hashed)
}

export const createToken = ({ username, role }: {
  username: string
  role: string
}) => {
  const token = jwt.sign({
    username,
    role
  }, TOKEN_SECRET)

  return token
}

export const verifyToken = (token: string) => {
  const user = jwt.verify(token, TOKEN_SECRET)
  return user
}