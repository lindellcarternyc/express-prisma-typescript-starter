import * as bcrypt from 'bcrypt'

export const encodePassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

export const comparePasswords = async (plaintext: string, hashed: string) => {
  return await bcrypt.compare(plaintext, hashed)
}