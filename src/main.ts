import { HttpServer } from './infra/http-server'
import { SetRoutesPoint } from './routes/point'

export const server = new HttpServer()

SetRoutesPoint(server)

server.start(4000)
