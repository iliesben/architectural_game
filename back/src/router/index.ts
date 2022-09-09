import { Router } from 'express'
const router = Router()
import { LobbyCrud } from './LobbyCrud'

router.post('/create', LobbyCrud.create)
router.post('/lobby/:lobbyId', LobbyCrud.join)
router.post('/lobby/:lobbyId/inGame', LobbyCrud.inGame)

export default router
