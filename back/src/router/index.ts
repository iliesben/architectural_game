import { Router } from 'express'
import { LobbyCrud } from './LobbyCrud'
const router = Router()

router.post('/create', LobbyCrud.create)
router.post('/lobby/:lobbyId', LobbyCrud.join)

export default router
