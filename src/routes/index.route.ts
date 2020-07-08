import express, {IRouter} from 'express'
import BasicRoute from '../interfaces/route.interface'
import indexPageController from '../handlers/index/index.get.handler'

export default class IndexRouter implements BasicRoute{
  public router: IRouter = express.Router()
  
  constructor(private path: string) {
    this.createRoutes()
  }
  
  createRoutes() {
    this.router.get(this.path, indexPageController)
  }
}
