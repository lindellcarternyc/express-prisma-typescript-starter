import { PrismaClient } from '.prisma/client'
import { DefaultController } from './controllers/default.controller'
import { userController } from './controllers/users.controller'
import { createServer, startServer } from './server'

const prisma = new PrismaClient()
startServer(
  createServer({
    prisma
  }, 
  userController,
  DefaultController
),
  6969
)
  .then(() => console.log('YAY'))
  .catch(() => console.log('SHIT'))
  .catch(() => console.log('whew!'))