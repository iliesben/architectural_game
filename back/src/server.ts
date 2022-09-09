import * as dotenv from 'dotenv'
dotenv.config()
import Express, { json } from 'express'
import http from 'http'
import router from '../src/router'
import cors from 'cors'
import Websocket from './services/socket'
import { LobbyCrud } from './router/LobbyCrud'

const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Cookie',
    'Set-Cookie',
    'Token'
  ],
  credentials: true,
  methods: ['GET', 'POST']
}

const app = Express()
const server = http.createServer(app)
const io = Websocket.getInstance(server)

app.use(json())
app.use(cors(corsOptions))

// Router
LobbyCrud.initSockets(io)
app.post('/api/create', LobbyCrud.create)
app.post('/api/lobby/:lobbyId', LobbyCrud.join)

server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 3000}`)
})

export default app
