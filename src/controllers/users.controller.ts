import { Router } from 'express'
import { Controller } from './types'

export const userController: Controller = ({ prisma }) => {
  const router = Router()

  router.get('/users', async (_, res) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })
      console.dir(users, { depth: null })
      res.status(200).json({ users })
    } catch (e) {
      console.log(e)
    }
  })

  router.delete('/users', async (req, res) => {
    try {
      await prisma.userRole.deleteMany({})
      await prisma.user.deleteMany({})

      res.status(203).send('DELETED ALL USERS')
    } catch (e) {
      console.log(e)
    }
  })

  return {
    path: '/users',
    router
  }
}