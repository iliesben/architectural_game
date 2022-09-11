export default class IPlayer {

  private ip: string
  public name: string
  public id: string
  public nbWin: number = 0
  public currentChoice: string = ''
  public currentWinner: string = ''

  constructor(ip: string, name: string, id: string) {
    this.ip = ip
    this.name = name
    this.id = id
  }

  public incrementNbWin() {
    this.nbWin++
  }

  public setCurrentWinner(id: string) {
    this.currentWinner = id
  }

  public setCurrentUserChoice(currentChoice: string) {
    this.currentChoice = currentChoice
  }

  public resetCurrentChoice() {
    this.currentChoice = ''
  }

  public resetCurrentWinner() {
    this.currentWinner = ''
  }
}
