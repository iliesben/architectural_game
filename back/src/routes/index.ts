import { Request, Response } from 'express'

export class LobbyCrud {
  public static async join(req: Request, res: Response) {
    try {
      const lobbyId = req.query.lobbyId
      console.log(req.query)
      res.send('8=====>')
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async create(req: Request, res: Response){
    try {
      const ip = req.socket.remoteAddress
      console.log(req.body, ip);
      res.send('zizi')
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }
}
