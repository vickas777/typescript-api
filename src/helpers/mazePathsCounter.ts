type MazeConstructionItem = string | boolean | number

export default class MazePathsCounter{
  private visitedMatrix: Array<Array<boolean>>
  
  constructor(private mazeMatrix: Array<Array<MazeConstructionItem>>, private allowedWaySymbol: MazeConstructionItem, private deniedWaySymbol: MazeConstructionItem) {
    this.visitedMatrix = this.initVisitedMatrix()
  }
  
  countMinSteps(): number {
    if(!this.isValidInput()) {
      return -1
    }
    
    if(!this.isPossibleToStart()){
      return 0
    }
    
    return this.findPath(0, 0)
  }
  
  private isPossibleToStart(){
    return this.mazeMatrix[0][0] === this.allowedWaySymbol
  }
  
  private isValidInput(): boolean{
    const initRowLength = this.mazeMatrix[0].length
    return this.mazeMatrix.every(row => row.length === initRowLength)
  }
  
  private initVisitedMatrix(): Array<Array<boolean>>{
    const arr = []
    const row = Array(this.mazeMatrix[0].length).fill(false)
    for (let i = 0; i < this.mazeMatrix.length; i++){
      arr.push([...row])
    }
    
    return arr
  }
  
  private findPath(rowIndex: number, colIndex: number, minimalDistance: number = Infinity, distance: number = 0): number{
    if (this.hasReachedEnd(colIndex, rowIndex)){
      return Math.min(minimalDistance, distance)
    }
    
    this.visitedMatrix[rowIndex][colIndex] = true
    
    if(this.isPossibleGoRight(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex, colIndex + 1, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoLeft(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex, colIndex - 1, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoTop(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex - 1, colIndex, minimalDistance, distance + 1)
    }
  
    if(this.isPossibleGoBottom(rowIndex, colIndex)) {
      minimalDistance = this.findPath(rowIndex + 1, colIndex, minimalDistance, distance + 1)
    }
  
    this.visitedMatrix[rowIndex][colIndex] = false
    return minimalDistance
  }
  
  private hasReachedEnd(colIndex: number, rowIndex: number): boolean {
    return this.mazeMatrix[0].length - 1 === colIndex && this.mazeMatrix.length - 1 === rowIndex;
  }
  
  private isPossibleGoRight(rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex, colIndex + 1) &&
      this.isPossibleToVisit(rowIndex, colIndex + 1)
    )
  }
  
  private isPossibleGoLeft(rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex, colIndex - 1) &&
      this.isPossibleToVisit(rowIndex, colIndex - 1)
    )
  }
  
  private isPossibleGoTop(rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex - 1, colIndex) &&
      this.isPossibleToVisit(rowIndex - 1, colIndex)
    )
  }
  
  private isPossibleGoBottom(rowIndex: number, colIndex: number){
    return (
      this.isValidPosition(rowIndex + 1, colIndex) &&
      this.isPossibleToVisit(rowIndex + 1, colIndex)
    )
  }
  
  private isPossibleToVisit(rowIndex: number, colIndex: number): boolean {
    return !(this.mazeMatrix[rowIndex][colIndex] === this.deniedWaySymbol || this.visitedMatrix[rowIndex][colIndex])
  }
  
  private isValidPosition(rowIndex: number, colIndex: number): boolean{
    return this.mazeMatrix.length > rowIndex && rowIndex >= 0 && this.mazeMatrix[0].length > colIndex && colIndex >= 0
  }
}
