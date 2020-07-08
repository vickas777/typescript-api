import {Request, Response} from 'express'

export default function mazePostHandler(req: Request, res: Response){
  res.send({data: 'this is maze'})
}
