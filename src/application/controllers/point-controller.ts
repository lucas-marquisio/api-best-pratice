import { Clock } from '../../domain/point/clock'
import { Controller } from '../protocos/controller'
import { PointRepository } from '../repository/point-repository'
import { PointService } from '../services/point-service'
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

    const pointService = new PointService(this.clock)
    const proof = pointService.checkin(userId)

    await this.pointRepository.save(proof)

    return {
      statusCode: 200,
      body: proof
    }
  }
}
