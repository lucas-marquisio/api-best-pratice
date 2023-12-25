import express, { Express, Request, Response } from 'express'
import { Controller } from '../application/protocols/controller'

export class HttpServer {
  private server: Express

  constructor () {
    this.server = express()
    this.server.use(express.json())
  }

  get (path: string, controller: Controller) {
    this.server.get(path, async (request: Request, response: Response) => {
      const output = await controller.execute({
        body: request.body,
        params: request.params
      })

      return response.status(output.statusCode).json(output.body)
    })
  }

  post (path: string, controller: Controller) {
    this.server.post(path, async (request: Request, response: Response) => {
      const output = await controller.execute({
        body: request.body,
        params: request.params
      })

      return response.status(output.statusCode).json(output.body)
    })
  }

  start (port: number) {
    this.server.listen(port)
  }
}
