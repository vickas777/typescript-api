import express, {IRouter} from 'express'
import BasicRouter from '../interfaces/router.interface'
import mazeGetHandler from '../handlers/maze/maze.get.handler'
import mazePostHandler from '../handlers/maze/maze.post.handler'

export default class MazeRouter implements BasicRouter{
  public router: IRouter = express.Router()
  
  constructor(private path: string) {
    this.createRoutes()
  }
  
  createRoutes() {
    this.router.get(this.path, mazeGetHandler)
    this.router.post(this.path, mazePostHandler)
  }
}
