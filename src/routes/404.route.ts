import express, {IRouter} from 'express'
import BasicRoute from '../interfaces/route.interface'
import notFoundGetHandler from '../handlers/404/404.get.handler'

export default class NotFoundRoute implements BasicRoute{
  public router: IRouter = express.Router()
  
  constructor(private path: string) {
    this.createRoutes()
  }
  
  createRoutes() {
    this.router.get(this.path, notFoundGetHandler)
    this.router.post(this.path, notFoundGetHandler)
  }
}
