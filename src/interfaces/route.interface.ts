import { IRouter } from 'express'
export default interface BasicRoute {
  router: IRouter
  createRoutes(): void
}
