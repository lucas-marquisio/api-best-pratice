import { Clock } from '../../domain/point/clock'
import { Controller } from '../protocos/controller'
import { PointRepository } from '../repository/point-repository'

export class PointCheckinController implements Controller {
  constructor (
    private readonly clock: Clock,
    private readonly pointRepository: PointRepository
  ) {}

  async execute (httpRequest: any): Promise<any> {
    const userId: string = httpRequest.body.id

    if (!userId)
      return {
        statusCode: 400,
        body: {}
      }
  }
}
