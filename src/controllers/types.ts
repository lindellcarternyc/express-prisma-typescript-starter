import { Router } from 'express'

export interface ControllerDeps {

}

export type Controller = (dependencies: ControllerDeps) => {
  path: string
  router: Router
}