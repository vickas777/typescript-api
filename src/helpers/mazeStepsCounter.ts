/* eslint-disable no-param-reassign */
type MazeBlock = string | boolean | number;

export default class MazeStepsCounter {
  public static exceptionalStates = {
    WrongInput: -1,
    UnreachableEnd: Infinity,
  };

  private visitedMatrix: Array<Array<boolean>>;

  constructor(
    private mazeMatrix: Array<Array<MazeBlock>>,
    private allowedBlock: MazeBlock,
    private deniedBlock: MazeBlock,
  ) {
    this.visitedMatrix = this.initVisitedMatrix();
  }

  countMinSteps(): number {
    if (!this.isValidInput()) {
      return MazeStepsCounter.exceptionalStates.WrongInput;
    }

    if (!this.isPossibleToStart()) {
      return MazeStepsCounter.exceptionalStates.UnreachableEnd;
    }

    return this.findPath(0, 0);
  }

  private isPossibleToStart() {
    return this.mazeMatrix[0][0] === this.allowedBlock;
  }

  private isValidInput(): boolean {
    const initRowLength = this.mazeMatrix[0].length;
    return this.mazeMatrix.every((row) => (
      row.length === initRowLength
      && row.every((block) => block === this.deniedBlock || block === this.allowedBlock)
    ));
  }

  private initVisitedMatrix(): Array<Array<boolean>> {
    const arr = [];
    const row = Array(this.mazeMatrix[0].length).fill(false);
    for (let i = 0; i < this.mazeMatrix.length; i += 1) {
      arr.push([...row]);
    }

    return arr;
  }

  private findPath(
    rowIndex: number,
    colIndex: number,
    minimalDistance: number = MazeStepsCounter.exceptionalStates.UnreachableEnd,
    distance: number = 0,
  ): number {
    if (this.hasReachedEnd(colIndex, rowIndex)) {
      return Math.min(minimalDistance, distance);
    }

    this.visitedMatrix[rowIndex][colIndex] = true;

    if (this.isPossibleGoRight(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex, colIndex + 1, minimalDistance, distance + 1);
    }

    if (this.isPossibleGoLeft(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex, colIndex - 1, minimalDistance, distance + 1);
    }

    if (this.isPossibleGoTop(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex - 1, colIndex, minimalDistance, distance + 1);
    }

    if (this.isPossibleGoBottom(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex + 1, colIndex, minimalDistance, distance + 1);
    }

    this.visitedMatrix[rowIndex][colIndex] = false;
    return minimalDistance;
  }

  private hasReachedEnd(colIndex: number, rowIndex: number): boolean {
    return this.mazeMatrix[0].length - 1 === colIndex && this.mazeMatrix.length - 1 === rowIndex;
  }

  private isPossibleGoRight(rowIndex: number, colIndex: number) {
    return (
      this.isValidPosition(rowIndex, colIndex + 1)
      && this.isPossibleToVisit(rowIndex, colIndex + 1)
    );
  }

  private isPossibleGoLeft(rowIndex: number, colIndex: number) {
    return (
      this.isValidPosition(rowIndex, colIndex - 1)
      && this.isPossibleToVisit(rowIndex, colIndex - 1)
    );
  }

  private isPossibleGoTop(rowIndex: number, colIndex: number) {
    return (
      this.isValidPosition(rowIndex - 1, colIndex)
      && this.isPossibleToVisit(rowIndex - 1, colIndex)
    );
  }

  private isPossibleGoBottom(rowIndex: number, colIndex: number) {
    return (
      this.isValidPosition(rowIndex + 1, colIndex)
      && this.isPossibleToVisit(rowIndex + 1, colIndex)
    );
  }

  private isPossibleToVisit(rowIndex: number, colIndex: number): boolean {
    return !(
      this.mazeMatrix[rowIndex][colIndex] === this.deniedBlock
      || this.visitedMatrix[rowIndex][colIndex]);
  }

  private isValidPosition(rowIndex: number, colIndex: number): boolean {
    return (
      this.mazeMatrix.length > rowIndex && rowIndex >= 0
      && this.mazeMatrix[0].length > colIndex && colIndex >= 0
    );
  }
}
