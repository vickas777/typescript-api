import { Request, Response } from 'express';
import MazeStepsCounter from '../../helpers/mazeStepsCounter';

enum MazeParts {
  AllowedToPassBlock = '.',
  DeniedToPassBlock = '#',
}

function generateStepsMessage(steps: number):string {
  if (steps === MazeStepsCounter.exceptionalStates.WrongInput) {
    return 'Received wrong input';
  }

  if (steps === MazeStepsCounter.exceptionalStates.UnreachableEnd) {
    return 'Unable to reach end of maze';
  }

  return `Minimal amount of steps is ${steps}`;
}

export default function mazePostHandler(req: Request, res: Response) {
  const mazeStepsCounter = new MazeStepsCounter(
    req.body,
    MazeParts.AllowedToPassBlock,
    MazeParts.DeniedToPassBlock,
  );

  const message = generateStepsMessage(mazeStepsCounter.countMinSteps());

  res.send({ message });
}
