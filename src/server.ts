import express from 'express'
import morgan from 'morgan'

import { Controller, ControllerDeps } from './controllers/types'


export const createServer = (dependencies: ControllerDeps, ...controllers: Controller[]): express.Express => {
  const app = express()
  app.use(express.json())
  app.use(morgan('dev'))

  for (const setupController of controllers) {
    const controller = setupController(dependencies)
    app.use(controller.path, controller.router)
  }

  return app
}

export const startServer = async (app: express.Express, port: number | string) => {
  return app.listen(port, () => {
    console.log(`App listening on port=${port}`)
  })
}