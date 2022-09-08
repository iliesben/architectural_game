export default class IPlayer {

  private ip: string
  private name: string
  private id: string
  public nbWin: number = 0
  public currentChoice: string = ''

  constructor(ip: string, name: string, id: string) {
    this.ip = ip
    this.name = name
    this.id = id
  }

  private incrementNbWin() {
    this.nbWin++
  }

  public setCurrentUserChoice(currentChoice: string) {
    this.currentChoice = currentChoice
  }
}
