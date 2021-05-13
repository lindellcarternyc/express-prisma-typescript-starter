import { Router } from 'express'
import { Controller } from './types'

export const userController: Controller = ({ prisma }) => {
  const router = Router()

  router.get('/users', async (_, res) => {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json({ users })
    } catch (e) {
      console.log(e)
    }
  })

  return {
    path: '/users',
    router
  }
}