export default class IPlayer {

  public ip: string
  public name: string
  public id: string
  public nbWin: number = 0
  public currentChoice: string = ''
  public currentWinner: boolean = false

  constructor(ip: string, name: string, id: string) {
    this.ip = ip
    this.name = name
    this.id = id
  }

  public setCurrentWinner() {
    this.currentWinner = true
    this.nbWin++
  }

  public setCurrentUserChoice(currentChoice: string) {
    this.currentChoice = currentChoice
  }

  public resetForNextTurn() {
    this.currentChoice = ''
    this.currentWinner = false
  }
}
