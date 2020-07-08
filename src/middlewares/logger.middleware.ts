import Logger from '../interfaces/logger.interface'
import morgan from 'morgan'
export class DevLogger implements Logger {
  private logger: any
  
  constructor() {
    this.logger = morgan('dev')
  }
  
  getLogger() {
    return this.logger
  }
}

export class ProductionLogger implements Logger {
  private logger: any
  
  constructor() {
    this.logger = morgan('combined')
  }
  
  getLogger() {
    return this.logger
  }
}

