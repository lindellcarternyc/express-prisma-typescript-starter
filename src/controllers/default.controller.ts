import { Router } from 'express'
import { Controller } from './types'

export const DefaultController: Controller = () => {
  const router = Router()

  router.use("/", (_, res) => {
    res.status(404).send('Not Found!')
  })

  return {
    path: '/',
    router
  }
}