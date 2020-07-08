import {Application} from "express";
import * as bodyParser from "body-parser";

import {DevLogger, ProductionLogger} from "./middlewares/logger.middleware";

import Registrator from './interfaces/registerator.interface'
import BasicRoute from './interfaces/route.interface'

import IndexRouter from './routes/index.route'
import MazeRouter from './routes/maze.route'
import NotFoundRoute from './routes/404.route'

export class MiddleWaresRegistrator implements Registrator{
  constructor(private app: Application) {
  }
  
  register() {
    this.getMiddleWareList().forEach(middleware => this.app.use(middleware));
  }
  
  private getMiddleWareList() {
    return [
      bodyParser.json(),
      bodyParser.urlencoded({extended: true}),
      (process.env.NODE_ENV === 'dev' ? new DevLogger() : new ProductionLogger()).getLogger()
    ]
  }
}

export class RoutesRegistrator implements Registrator{
  constructor(private app: Application) {}
  
  register(){
    this.getRouterList().forEach((router: BasicRoute)  => this.app.use(router.router))
  }
  
  private getRouterList(){
    return [
      new IndexRouter('/'),
      
      new MazeRouter('/maze'),
      new NotFoundRoute('*')
    ]
  }
}

