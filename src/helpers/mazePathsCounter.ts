type Maze = string | boolean | number

export default class MazePathsCounter <T>{
  // private row = [-1, 0, 0, 1]
  // private col = [0, -1, 1, 0]
  private visitedMatrix: [][]bolean
  
  constructor(private maze: Array<Array<Maze>>, private allowedWaySymbol: Maze, private deniedWaySymbol: Maze) {
  
  }
  
  countMinSteps(): number {
    if(!this.isValidInput()) {
      return -1
    }
    
    if(!this.isPossibleToStart()){
      return 0
    }
  
    const visitedMatrix = this.initVisitedMatrix()
    
    return this.findPath(visitedMatrix, 0, 0)
  }
  
  private isPossibleToStart(){
    return this.maze[0][0] === this.allowedWaySymbol
  }
  
  private isValidInput(): boolean{
    const initRowLength = this.maze[0].length
    return this.maze.every(row => row.length === initRowLength)
  }
  
  private initVisitedMatrix(): Array<Array<boolean>>{
    const arr = []
    const row = Array(this.maze[0].length).fill(false)
    for (let i = 0; i < this.maze.length; i++){
      arr.push([...row])
    }
    
    return arr
  }
  
  private findPath(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number, minimalDistance: number = Infinity, distance: number = 0): number{
    if (this.hasReachedEnd(colIndex, rowIndex)){
      return Math.min(minimalDistance, distance)
    }
    
    visitedMatrix[rowIndex][colIndex] = true
    
    if(this.isPossibleGoRight(visitedMatrix, rowIndex, colIndex)) {
      minimalDistance = this.findPath(visitedMatrix, rowIndex, colIndex + 1, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoLeft(visitedMatrix, rowIndex, colIndex)) {
      minimalDistance = this.findPath(visitedMatrix, rowIndex, colIndex - 1, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoTop(visitedMatrix, rowIndex, colIndex)) {
      minimalDistance = this.findPath(visitedMatrix, rowIndex - 1, colIndex, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoBottom(visitedMatrix, rowIndex, colIndex)) {
      minimalDistance = this.findPath(visitedMatrix, rowIndex + 1, colIndex, minimalDistance, distance + 1)
    }
  
    visitedMatrix[rowIndex][colIndex] = false
    return minimalDistance
  }
  
  private hasReachedEnd(colIndex: number, rowIndex: number): boolean {
    return this.maze[0].length - 1 === colIndex && this.maze.length - 1 === rowIndex;
  }
  
  private isPossibleGoRight(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex, colIndex + 1) &&
      this.isPossibleToVisit(visitedMatrix, rowIndex, colIndex + 1)
    )
  }
  
  private isPossibleGoLeft(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex, colIndex - 1) &&
      this.isPossibleToVisit(visitedMatrix, rowIndex, colIndex - 1)
    )
  }
  
  private isPossibleGoTop(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex - 1, colIndex) &&
      this.isPossibleToVisit(visitedMatrix, rowIndex - 1, colIndex)
    )
  }
  
  private isPossibleGoBottom(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex + 1, colIndex) &&
      this.isPossibleToVisit(visitedMatrix, rowIndex + 1, colIndex)
    )
  }
  
  private isPossibleToVisit(visitedMatrix: Array<Array<boolean>>, rowIndex: number, colIndex: number): boolean {
    return !(this.maze[rowIndex][colIndex] === this.deniedWaySymbol || visitedMatrix[rowIndex][colIndex])
  }
  
  private isValidPosition(rowIndex: number, colIndex: number): boolean{
    return this.maze.length > rowIndex && rowIndex >= 0 && this.maze[0].length > colIndex && colIndex >= 0
  }
}

const mat = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],

]

const maze = new MazePathsCounter(mat, 1, 0)
console.log(maze.countMinSteps());
