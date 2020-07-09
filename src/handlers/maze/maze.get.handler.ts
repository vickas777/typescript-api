import { Request, Response } from 'express';

export default function mazeGetHandler(req: Request, res: Response) {
  res.send({ info: 'To run maze make POST request' });
}
