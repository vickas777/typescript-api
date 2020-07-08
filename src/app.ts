import express, {Application} from 'express'
import {MiddleWaresRegistrator, RoutesRegistrator} from "./registrators";

export default class App {
  private app: Application
  
  constructor(private port?: number | string) {
    this.app = express()
    this.port = port || process.env.PORT || 3000
    this.applySettings()
    this.registerMiddleWares()
    this.registerRoutes()
  }
  
  applySettings(){
    this.app.set('port', this.port)
  }
  
  registerMiddleWares(){
    new MiddleWaresRegistrator(this.app).register()
  }
  
  registerRoutes(){
    new RoutesRegistrator(this.app).register()
  }
  
  async start(){
    await this.app.listen(this.port)
    console.log(`Server is listening at port ${this.port}`);
  }
}
