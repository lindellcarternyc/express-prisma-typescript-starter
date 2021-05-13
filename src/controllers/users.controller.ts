import { Router, Request } from 'express'
import { authenticateJWT } from '../middleware/auth.middleware'
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

  router.delete('/users', authenticateJWT, async (req, res) => {
    const user = (req as any).user as { role: string }
    
    try {  
      if (user.role === 'admin') {
        await prisma.userRole.deleteMany({})
        await prisma.user.deleteMany({})

        
        res.status(203).send('DELETED ALL USERS')
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (e) {
      console.log(e)
    }
  })

  return {
    path: '/users',
    router
  }
}