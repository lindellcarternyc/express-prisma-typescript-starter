import { Router } from 'express'
import * as yup from 'yup'
import { validate } from 'express-yup'

import { Controller } from './types'
import { comparePasswords, createToken, encodePassword } from './utils/auth.utils'

const registerSchema = yup.object().shape({
  body: yup.object().shape({
    username: yup.string()
      .required().min(5).max(20),
    email: yup.string().required().email(),
    password: yup.string().required()
      .min(5).max(25)
  }).required()
})

const loginSchema = yup.object().shape({
  body: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  }).required()
})

export const authController: Controller = ({ prisma }) => {
  const router = Router()

  router.post('/register', validate(registerSchema), async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await encodePassword(password)

    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword
        }
      })

      res.status(201).json({
        user: newUser
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal Server Error')
    }
  })

  router.post('/login', validate(loginSchema), async (req, res) => {
    console.log('/login')
    const { username, password } = req.body

    try {
      const user = await prisma.user.findFirst({
        where: {
          username
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })
      
      if (user === null) {
        res.status(401).send('Invalid username or password')
        return
      }

      const isValidPassword = await comparePasswords(password, user.password)
      if (isValidPassword) {

        let role: string
        if (user.roles.find(r => {
          return r.role.name === 'admin'
        })) {
          role = 'admin'
        } else {
          role = 'user'
        }

        const token = createToken({ username: user.username, role })

        res.status(200).json({ user, token: { token } })
      } else {
        res.status(401).send('Invalid username or password')
      }
    } catch (err) {
      throw err
    }
  })
  return {
    path: '/auth',
    router
  }
}