import MazeStepsCounter from '../../src/helpers/mazeStepsCounter';

const textInput = [
  ['.', '.', '.'],
  ['#', '#', '.'],
  ['.', '.', '.'],
  ['.', '#', '#'],
  ['.', '.', '.'],
];

const numberInput = [
  [1, 1, 1, 1],
  [0, 0, 1, 1],
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];

const booleanInput = [
  [true, true, true],
  [false, false, true],
  [true, true, true],
  [true, false, false],
  [true, true, true],
];

function deepCopy(data: {} | []) {
  return JSON.parse(JSON.stringify(data));
}

describe('mazeStepsCounter', () => {
  it('should work with different data types', () => {
    expect.assertions(3);
    let mazeStepsCounter: MazeStepsCounter;

    mazeStepsCounter = new MazeStepsCounter(textInput, '.', '#');
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(10);

    mazeStepsCounter = new MazeStepsCounter(numberInput, 1, 0);
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(7);

    mazeStepsCounter = new MazeStepsCounter(booleanInput, true, false);
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(10);
  });

  it('should have static values for exceptional situations', () => {
    expect.assertions(3);
    expect(MazeStepsCounter).toHaveProperty('exceptionalStates');
    expect(MazeStepsCounter.exceptionalStates).toHaveProperty('WrongInput', -1);
    expect(MazeStepsCounter.exceptionalStates).toHaveProperty('UnreachableEnd', Infinity);
  });

  it('should return number of steps for one allowed block', () => {
    expect.assertions(1);
    const input = [[1]];

    const mazeStepsCounter = new MazeStepsCounter(input, 1, 0);
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(0);
  });

  it('should return result if there are inappropriate blocks', () => {
    expect.assertions(1);
    const invalidInput = deepCopy(numberInput);
    invalidInput[0][0] = '.';

    const expected: number = MazeStepsCounter.exceptionalStates.WrongInput;

    const mazeStepsCounter = new MazeStepsCounter(invalidInput, 1, 0);
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(expected);
  });

  it('should return result if there is no exit', () => {
    expect.assertions(1);
    const noEnterInput = deepCopy(numberInput);
    noEnterInput[0][0] = 0;

    const expected: number = MazeStepsCounter.exceptionalStates.UnreachableEnd;

    const mazeStepsCounter = new MazeStepsCounter(noEnterInput, 1, 0);
    expect(mazeStepsCounter.countMinSteps()).toStrictEqual(expected);
  });
});
