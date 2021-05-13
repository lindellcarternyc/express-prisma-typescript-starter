import { DefaultController } from './controllers/default.controller'
import { createServer, startServer } from './server'

startServer(
  createServer({}, DefaultController),
  6969
)
  .then(() => console.log('YAY'))
  .catch(() => console.log('SHIT'))
  .catch(() => console.log('whew!'))